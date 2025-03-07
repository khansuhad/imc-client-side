"use client"; // If using Next.js 13+ with App Router

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);


    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Prevent default redirection
    });

    if (res?.error) {
      alert("Invalid credentials!");
      setLoading(false);
    } else {
      // Fetch user session to get role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role) {
        // Redirect based on role
        switch (session.user.role) {
          case "admin":
            router.push("/");
            break;
          case "user":
            router.push("/");
            break;
          default:
            router.push("/");
        }
      } else {
        router.push("/"); // Fallback redirection
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white text-gray-900 p-6 rounded-2xl shadow-xl"
      >
        {/* Logo with Home Link */}
        <div className="flex justify-center mb-4">
          <a href="/">
            <img src="https://i.postimg.cc/nzX8Y3C1/infinity-logo.jpg" 
                 alt="Logo" 
                 className="w-24 h-24 object-contain" />
          </a>
        </div>
        <hr className="h-[1px] bg-gray-300 mt-3" />
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-lg bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-lg bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold text-white flex justify-center items-center"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
        
        {/* Register Link */}
        {/* <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
        </p> */}
      </motion.div>
    </div>
  );
}
