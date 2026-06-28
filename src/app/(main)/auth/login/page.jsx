"use client";

import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { signIn, signInWithGoogle } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (data) {
      toast.success("Login successful! Redirecting...");
    }
    if (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-background font-sans antialiased px-4 py-28">
      <div className="flex flex-col md:flex-row  w-full h-full max-w-5xl mx-auto shadow-lg rounded-xl overflow-hidden">
        {/* 1. LEFT SIDE: Premium Brand Banner (Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/2 bg-[#FFDBFD] relative overflow-hidden flex-col justify-between">
          <div className="relative aspect-5/6 w-full h-full">
            <Image
              src="/Images/loginPage-left-side-banner.png"
              alt="Brand Logo"
              fill
              sizes=""
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* 2. RIGHT SIDE: Core Login Form Area */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-background dark:bg-slate-800">
          <div className="w-full max-w-md flex flex-col">
            {/* Mobile Logo View */}
            <div className="md:hidden mb-8">
              <div className="text-2xl font-black text-[#6367FF]">
                Chalo<span className="text-[#8494FF]">Ticket</span>
              </div>
            </div>

            {/* Header Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-secondary tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Enter your terminals details to continue
              </p>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-slate-100 hover:border-[#C9BEFF] rounded-xl text-sm font-bold text-slate-700 transition-all bg-slate-50 hover:bg-white mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15.02 0 12 0 7.33 0 3.32 2.67 1.39 6.56l3.83 2.97c.9-2.7 3.42-4.49 6.78-4.49z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.22 14.78c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.39 6.56C.5 8.34 0 10.31 0 12s.5 3.66 1.39 5.44l3.83-2.66z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.73-2.89c-1.04.7-2.37 1.12-4.23 1.12-3.36 0-5.88-1.79-6.78-4.49L1.39 17.44C3.32 21.33 7.33 24 12 24z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider "OR" */}
            <div className="relative flex py-2 items-center mb-6">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                or use email
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            {/* HeroUI Managed Form */}
            <Form
              className="flex w-full flex-col gap-5"
              render={(props) => <form {...props} />}
              onSubmit={onSubmit}
            >
              {/* Email Field */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="flex flex-col gap-1.5 w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-xs font-bold text-slate-700 dark:text-secondary uppercase tracking-wider">
                  Email Address
                </Label>
                <Input
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
                <FieldError className="text-xs font-semibold text-rose-500 mt-1" />
              </TextField>

              {/* Password Field */}
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="flex flex-col gap-1.5 w-full"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold text-slate-700 dark:text-secondary uppercase tracking-wider">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-[#6367FF] hover:text-[#8494FF] transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
                <Description className="text-[11px] font-medium text-slate-400 leading-normal mt-1">
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError className="text-xs font-semibold text-rose-500 mt-1" />
              </TextField>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full py-4 bg-[#6367FF] hover:bg-[#8494FF] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-[#6367FF]/10 text-center transform hover:-translate-y-0.5"
                >
                  Sign In to Account
                </Button>
              </div>
            </Form>

            {/* Bottom Link */}
            <p className="text-center text-sm font-medium text-slate-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-bold text-[#6367FF] hover:text-[#8494FF] transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
