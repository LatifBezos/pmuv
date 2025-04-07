import { BeerIcon } from "lucide-react";
import Link from "next/link";

export const HomeNavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <BeerIcon className="size-10 text-white rotate-12 transition-all duration-200" />
        <h1 className="hidden sm:block sm:text-2xl font-semibold tracking-tight text-white transition-all duration-200">
          Paye moi un verre ®
        </h1>
      </div>
    </Link>
  );
};
