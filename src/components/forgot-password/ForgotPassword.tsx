"use client";

import Image from "next/image";
import ForgotPasswordImage from "../../../public/forgot-password-grocery-project.svg";
import { MdOutlineMailOutline } from "react-icons/md";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password too short")
    .max(20, "Password must not exceed 20 characters."),
});

type LoginInputs = z.infer<typeof loginSchema>;

const ForgotPassword = () => {
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
    <section className="bg-[#E8E3CE] min-h-screen pb-5">
      <Image
        src={ForgotPasswordImage}
        alt="Imagem da tela de login"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <h1 className="text-4xl font-semibold">FoodNote</h1>
          <p className="text-[#C05100] text-lg">
            Write your email to recover your password
          </p>
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

          <Link
            href={"/recover-password"}
            className="bg-[#E96301] p-2 text-center text-white cursor-pointer mt-10 font-semibold rounded-lg"
            type="submit"
          >
            Recover password
          </Link>
          <Link
            href={"/login"}
            className="border border-[#E96301] p-2 text-[#E96301] text-center cursor-pointer mt-2 font-semibold rounded-lg"
            type="submit"
          >
            Back to login
          </Link>
        </form>
      </div>
    </section>
  );
};
export default ForgotPassword;
