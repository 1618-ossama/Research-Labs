import { useState } from "react";
import { useRouter } from "next/navigation";

// register type definition with bio and avatar ....

type FormData = {
  [key: string]: string;
};

type User = {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
};

type AuthMode = "login" | "register";

type AuthResponse = {
  token?: string;
  user?: User;
  error?: string;
  message?: string;
};

export const useAuthForm = (mode: AuthMode) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  const submitForm = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const endpoint = (mode === "login")
        ? "http://127.0.0.1:3000/login"
        : "http://127.0.0.1:3000/register";

      console.log("Submit to:", endpoint);
      console.log("Form data:", formData);

      const requestData = (mode === "login")
        ? { identifier: formData.identifier, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data: AuthResponse = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Authentication failed");
      }

      if (data.user) {
        setUserData(data.user);
      }

      if (mode === "login" && data.token) {
        document.cookie =
          `token=${data.token}; path=/; secure; samesite=strict`;
        router.push("/");
      } else if (mode === "register") {
        router.push(
          `/verify-email?email=${encodeURIComponent(formData.email)}`,
        );
      }

      return data;
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : "An unknown error occurred";
      setError(message);
      console.error("Authentication error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userData,
    submitForm,
  };
};
