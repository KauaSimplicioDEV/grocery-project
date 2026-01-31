"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterImage from "../../../public/register-grocery-project.svg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { addUsers } from "@/actions/add-user";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(4, "Username must be at least 4 characters"),
    email: z.email("Invalid email format").trim().toLowerCase(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleUserSubmit = async (data: RegisterInputs) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      await addUsers(data);
      setSubmitSuccess(true);
      router.push("/login");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="bg-[#E8E3CE] min-h-screen">
      <Image
        src={RegisterImage}
        alt="Register page illustration"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <h1 className="text-4xl font-semibold">FoodNote</h1>
          <p className="text-[#C05100] text-lg">
            Create your personalized grocery list
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleUserSubmit)}
          className="mt-5 flex flex-col gap-2"
        >
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              id="name"
              type="text"
              className="mx-7 w-full sm:w-96 outline-none bg-transparent"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            <FaUserAlt className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}

          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              id="email"
              type="email"
              className="mx-7 w-full sm:w-96 outline-none bg-transparent"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <MdOutlineMailOutline className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}

          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className="mx-7 w-full sm:w-96 outline-none bg-transparent"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          <label htmlFor="confirmPassword" className="text-lg">
            Confirm Password
          </label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              id="confirmPassword"
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="mx-7 w-full sm:w-96 outline-none bg-transparent"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
              {...register("confirmPassword")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
            <button
              type="button"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer"
              aria-label={
                isConfirmPasswordVisible ? "Hide password" : "Show password"
              }
            >
              {isConfirmPasswordVisible ? (
                <HiOutlineEye />
              ) : (
                <HiOutlineEyeOff />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Registration successful! You can now sign in.
            </div>
          )}

          <button
            className="bg-[#E96301] p-2 text-white cursor-pointer mt-4 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D55601] transition-colors"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex justify-center items-center mt-2 gap-1">
          <p>Already have an account?</p>
          <Link href={"/login"} className="underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
