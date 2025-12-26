"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterImage from "../../../public/register-grocery-project.svg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineLock } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z.string().min(4, "Username too short"),
    email: z.email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password too short")
      .max(20, "Password must not exceed 20 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type RegisterInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterInputs) => {
    console.log(data);
  };

  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isSecondEyeOpen, setIsSecondEyeOpen] = useState(false);

  return (
    <section className="bg-[#E8E3CE] min-h-screen">
      <Image
        src={RegisterImage}
        alt="Imagem da tela de login"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <h2 className="text-4xl font-semibold">FoodNote</h2>
          <p className="text-[#C05100] text-lg">
            Create your personalized grocery list
          </p>
        </div>

        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-lg">Nome</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type="text"
              className="mx-7 w-96 outline-none"
              {...register("name")}
            />
            <FaUserAlt className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
              minLength={6}
              maxLength={20}
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

          <label className="text-lg">Confirm your password</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type={isSecondEyeOpen ? "text" : "password"}
              className="mx-7 w-96 outline-none"
              {...register("confirmPassword")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
            {!isSecondEyeOpen ? (
              <HiOutlineEyeOff
                className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer select-none"
                onClick={() => setIsSecondEyeOpen(!isSecondEyeOpen)}
              />
            ) : (
              <HiOutlineEye
                className="absolute right-2 top-2 text-lg text-[#E96301] cursor-pointer select-none"
                onClick={() => setIsSecondEyeOpen(!isSecondEyeOpen)}
              />
            )}
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <button
            className="bg-[#E96301] p-2 text-white cursor-pointer mt-4 font-semibold rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center items-center mt-2 gap-1">
          <p>already have an account?</p>
          <Link href={"/login"} className="underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Register;
