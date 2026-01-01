import Image from "next/image";
import logo from "@/app/assets/Logo.webp";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center text-white mt-5">
      <h1 className="w-60 text-2xl text-center">
        סורק האתרים המקצועי מבית אקסיס
      </h1>
      <Link href={"/"}>
        <Image
          className="mt-2"
          src={logo}
          width={100}
          loading="lazy"
          alt="לוגו של חברת AXIS Studio בחלק העליון של הדף"
        />
      </Link>
    </header>
  );
}
