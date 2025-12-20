"use client";

import Image from "next/image";
import LoginImage from "../../../public/login-grocery-project.svg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password too short")
    .max(20, "Password must not exceed 20 characters."),
});

type LoginInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInputs) => {
    console.log(data);
  };

  return (
    <section className="bg-[#E8E3CE] min-h-screen">
      <Image
        src={LoginImage}
        alt="Imagem da tela de login"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <h1 className="text-4xl font-semibold">FoodNote</h1>
          <p className="text-[#C05100] text-lg">Ready to make some shopping?</p>
        </div>

        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-lg">Email</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type="email"
              className="mx-7 w-96 outline-none"
              {...register("email")}
            />
            <MdOutlineMailOutline className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label className="text-lg">Password</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type={isEyeOpen ? "text" : "password"}
              className="mx-7 w-96 outline-none"
              {...register("password")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
            {!isEyeOpen ? (
              <HiOutlineEyeOff
                className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer select-none"
                onClick={() => setIsEyeOpen(!isEyeOpen)}
              />
            ) : (
              <HiOutlineEye
                className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer select-none"
                onClick={() => setIsEyeOpen(!isEyeOpen)}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center">
              <input type="checkbox" className="accent-[#E96301] w-4 h-4" />
              <p className="ml-1">Remember-me</p>
            </div>
            <Link href={"/forgot-password"}>forgot your password?</Link>
          </div>

          <button
            className="bg-[#E96301] p-2 text-white cursor-pointer mt-4 font-semibold rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center items-center mt-2 gap-1">
          <p>don’t have an account?</p>
          <Link href={"/register"} className="underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Login;
