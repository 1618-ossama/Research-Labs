"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Checkbox } from "@components/ui/checkbox"
import { Upload, FileText, ImageIcon, X } from "lucide-react"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_PDF_TYPES = ["application/pdf"]

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    country: z.string().min(1, { message: "Please select your country" }),
    profileImage: z
      .any()
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: `Image must be less than 5MB`,
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }),
    document: z
      .any()
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: `Document must be less than 5MB`,
      })
      .refine((file) => !file || ACCEPTED_PDF_TYPES.includes(file.type), {
        message: "Only PDF format is supported",
      }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function RegistrationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "User"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      country: "",
      acceptTerms: false,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      form.setError("profileImage", {
        type: "manual",
        message: "Image must be less than 5MB",
      })
      return
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      form.setError("profileImage", {
        type: "manual",
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      })
      return
    }

    form.setValue("profileImage", file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      form.setError("document", {
        type: "manual",
        message: "Document must be less than 5MB",
      })
      return
    }

    if (!ACCEPTED_PDF_TYPES.includes(file.type)) {
      form.setError("document", {
        type: "manual",
        message: "Only PDF format is supported",
      })
      return
    }

    form.setValue("document", file)
    setPdfName(file.name)
  }

  const resetImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
    form.setValue("profileImage", undefined)
    setImagePreview(null)
  }

  const resetPdf = () => {
    if (pdfInputRef.current) {
      pdfInputRef.current.value = ""
    }
    form.setValue("document", undefined)
    setPdfName(null)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real application, you would create a FormData object to send files
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", values.email)
      formData.append("password", values.password)
      formData.append("phone", values.phone || "")
      formData.append("country", values.country)

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage)
      }

      if (values.document) {
        formData.append("document", values.document)
      }

      // Here you would typically send the form data to your API
      console.log("Form data prepared for submission:", {
        name,
        email: values.email,
        hasProfileImage: !!values.profileImage,
        hasDocument: !!values.document,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to success page
      router.push("/register/success")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Complete Registration</CardTitle>
        <CardDescription>
          Welcome, {name}! Please fill in the remaining details to complete your registration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Must be at least 8 characters long</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Profile Picture (Optional)</FormLabel>
                  <FormControl>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Profile preview"
                            className="w-full h-full object-cover rounded-full"
                          />
                          <button
                            type="button"
                            onClick={resetImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="profile-image"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                            </div>
                            <input
                              id="profile-image"
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.webp"
                              onChange={(e) => {
                                handleImageChange(e)
                              }}
                              ref={imageInputRef}
                              {...fieldProps}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Document Upload (Optional)</FormLabel>
                  <FormControl>
                    <div className="mt-2">
                      {pdfName ? (
                        <div className="flex items-center p-3 border rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-blue-500" />
                          <span className="text-sm truncate flex-1">{pdfName}</span>
                          <button
                            type="button"
                            onClick={resetPdf}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Remove document"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="document-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                            </div>
                            <input
                              id="document-upload"
                              type="file"
                              className="hidden"
                              accept=".pdf"
                              onChange={(e) => {
                                handlePdfChange(e)
                              }}
                              ref={pdfInputRef}
                              {...fieldProps}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I accept the terms and conditions</FormLabel>
                    <FormDescription>
                      By checking this box, you agree to our Terms of Service and Privacy Policy.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Complete Registration"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

