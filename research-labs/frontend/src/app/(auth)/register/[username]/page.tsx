"use client"
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

export default function DynamicRegisterPage() {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const [username, setUsername] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   const usernameParam = searchParams.get("username");
  //   if (usernameParam) {
  //     setUsername(usernameParam);
  //   } else {
  //     router.push('/404');
  //   }
  // }, [searchParams, router]);
  //
  // if (!username) return null;
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <RegistrationForm />
    </div>
  )
}
