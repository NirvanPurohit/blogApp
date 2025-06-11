import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
  setError(""); // clear previous error
  try {
    const session = await authService.login(data);

    if (session) {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } else {
      console.log("Login failed: No session returned");
      setError("Login failed. Please check your email and password.");
    }

  } catch (err) {
    console.log(err); // useful for debugging

    if (
      err?.message?.toLowerCase().includes("invalid credentials") ||
      err?.code === 401
    ) {
      setError("Invalid credentials. Please check your email and password.");
    } else {
      setError("Login failed. Please try again.");
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-xl p-10 border border-white/30 shadow-xl"
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-lg text-white/80">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-yellow-300 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Global Error */}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          {/* Email Input */}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-white/20 border-white/30 text-black placeholder-white/50"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                  ? true
                  : "Email address must be a valid address",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-white/20 border-white/30 text-black placeholder-white/50"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Sign In
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
