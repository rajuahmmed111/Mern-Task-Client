/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ForgotImg from "@/assets/forgot-password/amico.png";
import { useForgottenPasswordMutation } from "@/redux/features/api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [forgottenPassword] = useForgottenPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // API integration for password reset
      const res = await forgottenPassword({ email }).unwrap();

      setMessage({
        type: "success",
        text: res?.message || "Verification code sent to your email!",
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.data?.message || "Failed to send verification code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={ForgotImg}
                alt="Forgot password illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="flex items-center mb-6">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold ml-2">Forgot Password</h1>
              </div>

              <p className="text-gray-600 mb-8">
                Enter the email address associated with your account. We&apos;ll
                send you an verification code to your email.
              </p>

              {message && (
                <div
                  className={`p-3 mb-4 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Get OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
