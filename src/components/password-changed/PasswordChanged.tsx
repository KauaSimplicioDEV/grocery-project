"use client";

import Image from "next/image";
import PasswordChangedImage from "../../../public/password-changed-image.svg";
import CheckPasswordChanged from "../../../public/check-password-changed.svg";
import Link from "next/link";

const PasswordChanged = () => {
  return (
    <section className="bg-[#E8E3CE] min-h-screen pb-5">
      <Image
        src={PasswordChangedImage}
        alt="Imagem da tela de login"
        className="w-full"
      />
      <div className="center-nav mx-auto text-[#E96301] py-5">
        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <div className="w-full flex flex-col items-center justify-center">
            <Image src={CheckPasswordChanged} alt="Imagem da tela de login" />
            <div className="w-full flex flex-col items-center mt-5 gap-2">
              <h3 className="text-4xl font-semibold">Success!</h3>
              <p className="font-light text-lg">
                your password has been changed!
              </p>
            </div>
            <Link
              href={"/login"}
              className="bg-[#E96301] p-2 text-center text-white cursor-pointer w-full mt-10 font-semibold rounded-lg"
              type="submit"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PasswordChanged;
