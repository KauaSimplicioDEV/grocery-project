import Image from "next/image";
import { GiNotebook } from "react-icons/gi";
import SplashImage from "../../../public/splash-image.svg"
import Link from "next/link";

function Splash() {
  return (
    <div className="bg-[#491AA5] min-h-screen text-white">
      <div className="center-nav mx-auto font-bold flex flex-col pt-20 gap-1">
        <div className="text-3xl relative">
          <h1 className="text-4xl">List your grocery</h1>
        </div>
        <div>
          <div className="flex mt-2">
            <h2 className="text-4xl">go for shopping</h2>
            <GiNotebook />
          </div>
          <div className="flex items-end justify-end mt-5">
            <Link href={"/login"} className="bg-[#E96301] p-2 rounded-lg cursor-pointer text-sm font-semibold">Get started</Link>
          </div>
        </div>
      </div>
      <Image src={SplashImage} alt="Imagem Splash" className="rounded-t-full" />
    </div>
  );
}

export default Splash;
