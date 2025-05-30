"use client"

import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useAuthForm } from "@/hooks/use-auth"
import useSessionStorage from "@/hooks/useSessionStorage"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface LogFormProps extends React.ComponentProps<"div"> {
  formPosition?: "left" | "right"
  imageSrc?: string
  imageAlt?: string
}

export function LogForm({
  className,
  formPosition = "left",
  imageSrc = "globe.svg",
  imageAlt = "Login illustration",
  ...props
}: LogFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-4">
        <CardContent className="grid p-0 md:grid-cols-2">
          {formPosition === "left" ? (
            <>
              <LoginFormContent />
              <ImageContent imageSrc={imageSrc} imageAlt={imageAlt} />
            </>
          ) : (
            <>
              <ImageContent imageSrc={imageSrc} imageAlt={imageAlt} />
              <RegisterFormContent />
            </>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

function LoginFormContent() {
  const { isLoading, error, submitForm } = useAuthForm('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    try {
      await submitForm(data);
    } catch {
      console.log('submit error', error);

    }
  };
  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">Login to your account</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="identifier">Identifier</Label>
          <Input id="identifier" name="identifier" type="text" placeholder="username or email" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  )
}


function RegisterFormContent() {
  const { setValue } = useSessionStorage<{ username: string, email: string }>('FormPartOne');
  const [form, setForm] = useState({ username: '', email: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username.trim() || !form.email.trim()) {
      alert("Both fields are required.");
      return;
    }
    setValue(form);
    router.push(`/register/${encodeURIComponent(form.username)}?username=${encodeURIComponent(form.username)}`);
  }

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome </h1>
          <p className="text-balance text-muted-foreground">Register a new account</p>
        </div>
        {["username", "email"].map((field) => (
          <div key={field} className="grid gap-2 text-left">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field === "email" ? "example@mail.com" : "Username"}
              value={form[field as "username" | "email"]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <Button type="submit" className="w-full">
          Continue
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </div>

      </div>
    </form >
  )
}

function ImageContent({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <div className="relative hidden bg-muted md:block">
      <Image
        width={100} height={100}
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

