"use client";

import Image from "next/image";
import RecoverPasswordImage from "../../../public/recover-password-grooce-project.svg";
import { MdOutlineLock } from "react-icons/md";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const recoverSchema = z
  .object({
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

type RecoverInputs = z.infer<typeof recoverSchema>;

const RecoverPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RecoverInputs>({
    resolver: zodResolver(recoverSchema),
  });

  const onSubmit = (data: RecoverInputs) => {
    console.log(data);
  };

  return (
    <section className="bg-[#E8E3CE] min-h-screen pb-5">
      <Image
        src={RecoverPasswordImage}
        alt="Imagem da tela de login"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <h2 className="text-4xl font-semibold">FoodNote</h2>
          <p className="text-[#C05100] text-lg">
            Write your email to recover your password
          </p>
        </div>

        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-lg">New Password</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type="password"
              className="mx-7 w-96 outline-none"
              {...register("password")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <label className="text-lg">Confirm New Password</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input
              type="password"
              className="mx-7 w-96 outline-none"
              {...register("confirmPassword")}
            />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <Link
            href={"/password-changed"}
            className="bg-[#E96301] p-2 text-center text-white cursor-pointer mt-10 font-semibold rounded-lg"
            type="submit"
          >
            Change password
          </Link>
        </form>
      </div>
    </section>
  );
};
export default RecoverPassword;
