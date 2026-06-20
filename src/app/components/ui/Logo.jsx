import { LogoOsi } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ textSize = "text-4xl", className = "", LogoSize = 60 }) => {
  return (
    <Link
      href="/"
      className={`flex items-center gap-1.5 font-black tracking-tight text-primary flex-1 ${className}`}
    >
      {" "}
      <div className="realative w-12 h-12">
        <Image
          src="/Images/logo.png"
          alt="Logo"
          width={LogoSize}
          height={LogoSize}
        />
      </div>
      <p className={`text-primary font-bold tracking-tight ${textSize}`}>
        Chalo<span className="text-[#8494FF]">Ticket</span>
      </p>
    </Link>
  );
};

export default Logo;
