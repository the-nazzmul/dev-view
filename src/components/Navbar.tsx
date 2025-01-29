import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <Image src="/dev-view-logo.png" alt="logo" height={40} width={40} />
          <span className="bg-gradient-to-r from-[#9333ea] to-[#4f46e5] text-transparent bg-clip-text">
            DevView
          </span>
        </Link>

        {/* Action button */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DashboardBtn />
            <ThemeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
