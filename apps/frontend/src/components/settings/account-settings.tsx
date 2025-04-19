"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Toast as toast } from "@/components/ui/use-toast";
import { AlertCircleIcon } from "lucide-react"

const accountFormSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    currentPassword: z.string().min(1, {
      message: "Please enter your current password.",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: "Please confirm your new password.",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  )

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  email: "pfe.test@gmail.com",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

export default function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    setIsLoading(true)

    // toast isn't working properly
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully.",
      })

      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account email and password.</CardDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>This is the email address you use to sign in.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure.</p>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Password must be at least 8 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
            <div className="flex items-start gap-4">
              <AlertCircleIcon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-destructive">Delete Account</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Permanently delete your account and all of your content. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" className="mt-4">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
