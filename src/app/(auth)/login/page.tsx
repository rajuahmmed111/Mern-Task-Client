/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginMutation } from "@/redux/features/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import LoginImg from "@/assets/login/login.png";

type FormValues = { email: string; password: string };

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data).unwrap();
      localStorage.setItem("token", res.token);

      reset();
      toast.success("Login successfully !");

      // redirect home
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-[630px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200">
        <div className="flex flex-col md:flex-row">
          {/* right side */}
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
             <div className="relative w-full h-full">
             <Image
                src={LoginImg}
                alt="Login illustration"
                className="object-contain"
                fill
              />  
            </div>
          </div>

          {/* left side */}
          <div className="w-full md:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl mb-4 text-center">Login</h2>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 p-2 border rounded"
                />
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                  />

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-600 hover:text-purple-500"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-2 top-2 text-gray-500"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#60E5AE] text-[#1F1F1F] font-medium p-2 rounded disabled:opacity-50"
                >
                  {isLoading ? "Logging in…" : "Login"}
                </button>
              </form>

              <div className="mt-6 text-center">
                {" "}
                <p className="text-sm text-gray-600">Or Sign In with</p>
                <button
                  type="button"
                  className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/registration"
                      className="text-purple-600 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
