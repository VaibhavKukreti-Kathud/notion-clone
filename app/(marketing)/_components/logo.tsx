import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="md:flex hidden items-center gap-x-5 gap-y-2">
      <Image
        src="/vercel.svg"
        alt="Vercel"
        color="#ffffff"
        height={80}
        width={80}
        className="dark:hidden"
      />
      <Image
        src="/vercel.svg"
        alt="Vercel"
        height={80}
        width={80}
        className="hidden dark:block"
      />
    </div>
  );
};
