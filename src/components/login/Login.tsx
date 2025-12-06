import Image from "next/image";
import LoginImage from "../../../public/login-grocey-project.svg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";

const Login = () => {
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
          <p className="text-[#C05100]">Ready to make some shopping?</p>
        </div>

        <form className="mt-5 flex flex-col gap-2">
          <label className="text-lg">Email</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input type="email" className="mx-7 w-96 outline-none" />
            <MdOutlineMailOutline className="absolute left-2 text-lg text-[#E96301]" />
          </div>
          <label className="text-lg">Password</label>
          <div className="relative flex items-center border border-[#E96301] rounded p-1 text-black">
            <input type="password" className="mx-7 w-96 outline-none" />
            <MdOutlineLock className="absolute left-2 text-lg text-[#E96301]" />
            <HiOutlineEye className="absolute right-2 text-lg text-[#E96301] cursor-pointer" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" />
              <p className="ml-1">Remember-me</p>
            </div>
            <Link href={"forget-password"}>forget password?</Link>
          </div>

          <button className="bg-[#E96301] p-2 text-white cursor-pointer mt-4 font-semibold rounded-lg">
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
