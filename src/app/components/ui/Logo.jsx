import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image src="/Images/logo.png" alt="Logo" width={60} height={60} />
    </div>
  );
};

export default Logo;
