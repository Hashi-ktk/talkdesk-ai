"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Eye, EyeOff, Mail, Lock, Zap, Shield, BarChart3, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const DEMO_EMAIL = "demo@example.com"
const DEMO_PASSWORD = "Demo@123"

function validateEmail(email: string): string | null {
  if (!email) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address"
  return null
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters"
  return null
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBlur = useCallback((field: "email" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }))
    if (field === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(email) ?? undefined }))
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(password) ?? undefined }))
    }
  }, [email, password])

  const fillDemoCredentials = useCallback(() => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setErrors({})
    setTouched({})
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    setTouched({ email: true, password: true })
    setErrors({
      email: emailError ?? undefined,
      password: passwordError ?? undefined,
    })
    if (emailError || passwordError) return

    setIsSubmitting(true)
    // Simulate sign-in then redirect
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1200)
  }, [email, password])

  return (
    <div className="flex min-h-svh bg-background">
      {/* Left Hero Section */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-10 lg:flex xl:p-14">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/80 via-primary to-primary" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-white/[0.03]" />

        {/* Logo / Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">All-Temp AI</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Smart Calls,<br />Real Results.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-white/75 xl:text-lg">
              AI-powered calling agent that books appointments, qualifies leads, and handles customer inquiries around the clock.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: Zap, label: "Instant lead qualification & booking" },
              { icon: Shield, label: "Secure, HIPAA-ready conversations" },
              { icon: BarChart3, label: "Real-time analytics & insights" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-white/90" />
                </div>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs text-white/40">
          &copy; 2026 All-Temp Heating &amp; Cooling. All rights reserved.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2">
        {/* Mobile-only brand header */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Phone className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">All-Temp AI</span>
        </div>

        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Demo Credentials Banner */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                  <Zap className="h-3 w-3 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Demo Credentials
                </span>
              </div>
              <div className="mb-3 space-y-1 text-sm text-muted-foreground">
                <p>
                  Email: <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">{DEMO_EMAIL}</code>
                </p>
                <p>
                  Password: <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">{DEMO_PASSWORD}</code>
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full border-primary/25 text-primary hover:bg-primary/10"
                onClick={fillDemoCredentials}
              >
                Use Demo Credentials
              </Button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    suppressHydrationWarning
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (touched.email) {
                        setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) ?? undefined }))
                      }
                    }}
                    onBlur={() => handleBlur("email")}
                    className={cn("pl-10", touched.email && errors.email && "border-destructive focus-visible:ring-destructive")}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                </div>
                {touched.email && errors.email && (
                  <p id="email-error" className="text-xs text-destructive" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    onClick={() => {/* Forgot password handler */}}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                      if (touched.password) {
                        setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) ?? undefined }))
                      }
                    }}
                    onBlur={() => handleBlur("password")}
                    className={cn("pl-10 pr-10", touched.password && errors.password && "border-destructive focus-visible:ring-destructive")}
                    aria-invalid={touched.password && !!errors.password}
                    aria-describedby={touched.password && errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p id="password-error" className="text-xs text-destructive" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">
                  Remember me
                </Label>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            {/* Google Sign In */}
            <Button variant="outline" className="w-full" type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </CardContent>
        </Card>

        {/* Bottom text for mobile */}
        <p className="mt-8 text-center text-xs text-muted-foreground lg:hidden">
          &copy; 2026 All-Temp Heating &amp; Cooling. All rights reserved.
        </p>
      </div>
    </div>
  )
}
