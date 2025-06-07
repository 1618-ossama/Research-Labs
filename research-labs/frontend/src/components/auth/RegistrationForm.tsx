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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_PDF_TYPES = ["application/pdf"];

const formSchema = z.object({
  first_name: z.string().min(3, { message: "First name must be at least 3 characters" }),
  last_name: z.string().min(3, { message: "Last name must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number format" }).optional(),
  role: z.string().min(1, { message: "Role is required" }),
  affiliation: z.string().optional(),
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
  { value: "LEADER", label: "Leader" },
  { value: "RESEARCHER", label: "Researcher" },
  { value: "GUEST", label: "Guest" },
] as const;

export function RegistrationForm() {
  const router = useRouter();
  const { submitForm } = useAuthForm("register");
  const { readValue, deleteValue } = useSessionStorage<{ username: string, email: string }>('FormPartOne');
  const [formData, setFormData] = useState<{ username?: string, email?: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const profileImageUpload = useFileUpload({
    type: 'image',
    maxSize: MAX_FILE_SIZE,
    acceptedTypes: ACCEPTED_IMAGE_TYPES
  });

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
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "GUEST",
      profileImage: undefined,
      document: null,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitError(null);

      const profileForm = new FormData();
      profileForm.append("file", values.profileImage);

      const uploadRes = await fetch(`http://127.0.0.1:3009/api/upload`, {
        method: "POST",
        body: profileForm,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");

      const { filePath: profileImagePath } = await uploadRes.json();

      const userData = {
        username: formData?.username,
        email: formData?.email,
        password_hash: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        photo_url: profileImagePath,
        role: values.role,
        phone: values.phone || undefined,
        affiliation: values.affiliation || undefined,
        bio: values.bio || undefined
      };

      //@ts-expect-error : weak controllable type error
      await submitForm(userData);

      deleteValue();
      router.push("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setSubmitError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    if (profileImageUpload.file) {
      setValue("profileImage", profileImageUpload.file, { shouldValidate: true });
    }
  }, [profileImageUpload.file, setValue]);

  useEffect(() => {
    if (documentUpload.file) {
      setValue("document", documentUpload.file, { shouldValidate: true });
    }
  }, [documentUpload.file, setValue]);

  if (!formData && !isSubmitSuccessful) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <span className="ml-3 text-base font-medium text-gray-700">Loading registration data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-170 bg-white rounded-lg shadow-lg overflow-hidden transition-all">
      <div className="px-6 py-6 sm:px-8 sm:py-8 border-b border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Complete Registration</h2>
        <p className="mt-2 text-base text-gray-600">
          Please fill in the details to complete your registration for{" "}
          <span className="font-medium text-red-500">{formData?.username}</span>
        </p>
      </div>

      {(submitError) && (
        <div className="mx-6 sm:mx-8 mt-4 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-800 text-sm">
            {submitError}
          </p>
        </div>
      )}

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="first_name"
                type="text"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.first_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter a first name"
                {...register("first_name")}
              />
            </div>
            <p className="text-xs text-gray-500">
              Must be at least 3 characters
            </p>
            {errors.first_name && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="last_name"
                type="text"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.last_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter a last name"
                {...register("last_name")}
              />
            </div>
            <p className="text-xs text-gray-500">
              Must be at least 3 characters
            </p>
            {errors.last_name && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter password"
                {...register("password")}
              />
            </div>
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </p>
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+212 666666666"
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              {...register("phone")}
            />
            <p className="text-xs text-gray-500">Include country code (e.g., +212 for Morocco)</p>
            {errors.phone && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700">
              Affiliation
            </label>
            <div className="relative">
              <input
                id="affiliation"
                type="text"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.affiliation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Your affiliation"
                {...register("affiliation")}
              />
            </div>
            {errors.affiliation && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.affiliation.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="role"
                className={`w-full px-4 py-2.5 rounded-lg border appearance-none bg-white ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                {...register("role")}
              >
                {RoleOptions.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            {errors.role && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.role.message}
              </p>
            )}
          </div>


          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2 transition-colors resize-none"
              rows={4}
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.bio.message}
              </p>
            )}
          </div>


          <div className="space-y-2">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Picture <span className="text-red-500">*</span>
            </label>
            <FileUploadField
              type="image"
              previewUrl={profileImageUpload.previewUrl}
              onClear={() => {
                profileImageUpload.clearFile();
                //@ts-expect-error : to be ignored
                setValue("profileImage", undefined, { shouldValidate: true });
              }}
              onChange={profileImageUpload.handleFileChange}
              error={errors.profileImage?.message || profileImageUpload.error}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
              Document Upload
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
              className="w-full"
            />
          </div>

          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all hover:bg-gray-100">
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  className={`h-4 w-4 rounded border ${errors.acceptTerms ? 'border-red-500' : 'border-gray-300'} text-blue-600 focus:ring-blue-500`}
                  {...register("acceptTerms")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="acceptTerms" className="text-sm font-medium text-gray-700">
                  I accept the terms and conditions <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  By checking this box, you agree to our Terms of Service and Privacy Policy.
                </p>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600 flex items-center mt-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Completing Registration...
              </span>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>
      </div>

      <div className="px-6 py-5 sm:px-8 border-t border-gray-200 flex justify-center bg-gray-50">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-all">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
