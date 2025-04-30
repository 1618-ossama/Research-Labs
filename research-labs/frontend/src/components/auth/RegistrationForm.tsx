"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, AlertCircle } from "lucide-react";
import useFileUpload from "@/hooks/useFileUpload";
import FileUploadField from "@/components/auth/FileUploadField";
import { useAuthForm } from "@/hooks/use-auth";
import useSessionStorage from "@/hooks/useSessionStorage";
import { serializeFormData } from "@/lib/serializeFormData";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_PDF_TYPES = ["application/pdf"];

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number format" }),
  role: z.string().min(1, { message: "Role is required" }),
  bio: z.string().optional(),
  profileImage: z
    .instanceof(File, { message: "Please upload a profile image" })
    .refine(file => file.size <= MAX_FILE_SIZE, `Image must be less than 5MB`)
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Only .jpg, .jpeg, .png and .webp formats are allowed" }),
  document: z
    .instanceof(File)
    .refine(file => !file || file.size <= MAX_FILE_SIZE, `Document must be less than 5MB`)
    .refine(file => !file || ACCEPTED_PDF_TYPES.includes(file.type), { message: "Only PDF files are allowed" })
    .optional()
    .nullable(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RoleOptions = [
  { value: "Leader", label: "Leader" },
  { value: "Researcher", label: "Researcher" },
  { value: "Guest", label: "Guest" },
  { value: "Other", label: "Other" },
] as const;

export function RegistrationForm() {
  const router = useRouter();
  const { submitForm, isLoading, error } = useAuthForm("register");
  const { readValue, deleteValue } = useSessionStorage<{ username: string, email: string }>('FormPartOne');
  const [formData, setFormData] = useState<{ username?: string, email?: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const profileImageUpload = useFileUpload({
    type: 'image',
    maxSize: MAX_FILE_SIZE,
    acceptedTypes: ACCEPTED_IMAGE_TYPES
  });

  // Handle document upload
  const documentUpload = useFileUpload({
    type: 'pdf',
    maxSize: MAX_FILE_SIZE,
    acceptedTypes: ACCEPTED_PDF_TYPES
  });

  useEffect(() => {
    const storedData = readValue();
    if (storedData?.username && storedData?.email) {
      setFormData(storedData);
    } else {
      router.push('/register');
    }
  }, [readValue, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      phone: "",
      role: "Guest",
      bio: "",
      profileImage: undefined,
      document: null,
      acceptTerms: false,
    },
  });

  // Watch form values for validation display
  const watchedRole = watch("role");
  const watchedAcceptTerms = watch("acceptTerms");

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitError(null);

      const completeData = {
        ...values,
        username: formData?.username,
        email: formData?.email,
      };

      const data = serializeFormData(completeData);
      await submitForm(data);

      deleteValue();
      router.push("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setSubmitError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  // Set profile image value when file is selected
  useEffect(() => {
    if (profileImageUpload.file) {
      setValue("profileImage", profileImageUpload.file, { shouldValidate: true });
    }
  }, [profileImageUpload.file, setValue]);

  // Set document value when file is selected
  useEffect(() => {
    if (documentUpload.file) {
      setValue("document", documentUpload.file, { shouldValidate: true });
    }
  }, [documentUpload.file, setValue]);

  if (!formData && !isSubmitSuccessful) {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading registration data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Complete Registration</h2>
        <p className="text-gray-500 mt-1">
          Please fill in the details to complete your registration for {formData?.email}
        </p>
      </div>

      {(error || submitError) && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-300 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-red-800 text-sm">
            {error || submitError}
          </p>
        </div>
      )}

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              {...register("password")}
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </p>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 1234567890"
              className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              {...register("phone")}
            />
            <p className="text-xs text-gray-500">Include country code (e.g., +1 for US)</p>
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              className={`w-full px-3 py-2 border rounded-md bg-white ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
              {...register("role")}
            >
              {RoleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio (Optional)
            </label>
            <input
              id="bio"
              type="text"
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <FileUploadField
              type="image"
              previewUrl={profileImageUpload.previewUrl}
              onClear={() => {
                profileImageUpload.clearFile();
                setValue("profileImage", undefined, { shouldValidate: true });
              }}
              onChange={profileImageUpload.handleFileChange}
              error={errors.profileImage?.message || profileImageUpload.error}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
              Document Upload (Optional)
            </label>
            <FileUploadField
              type="pdf"
              previewUrl={documentUpload.previewUrl}
              onClear={() => {
                documentUpload.clearFile();
                setValue("document", null, { shouldValidate: true });
              }}
              onChange={documentUpload.handleFileChange}
              error={errors.document?.message || documentUpload.error}
            />
          </div>

          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <input
              id="acceptTerms"
              type="checkbox"
              className="h-4 w-4 mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              {...register("acceptTerms")}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="acceptTerms" className="text-sm font-medium text-gray-700">
                I accept the terms and conditions
              </label>
              <p className="text-xs text-gray-500">
                By checking this box, you agree to our Terms of Service and Privacy Policy.
              </p>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Completing Registration...
              </span>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>
      </div>
      <div className="px-6 py-4 border-t flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="underline text-blue-600 hover:text-blue-800">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
