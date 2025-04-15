import { BeerIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HomeNavbarLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HomeNavbarLogo = ({
  className,
  ...props
}: HomeNavbarLogoProps) => {
  return (
    <Link href="/" className="flex items-center">
      <div
        className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2"
        {...props}
      >
        <BeerIcon
          className={cn(
            "size-8 sm:size-10 text-white rotate-12 transition-all duration-200",
            className
          )}
        />
        <h1 className="hidden sm:block text-xl sm:text-2xl font-semibold tracking-tight text-white transition-all duration-200">
          Paye moi un verre ®
        </h1>
      </div>
    </Link>
  );
};
