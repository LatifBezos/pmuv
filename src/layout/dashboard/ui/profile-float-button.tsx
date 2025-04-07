import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileFloatButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileFloatButton({
  className,
  ...props
}: ProfileFloatButtonProps) {
  return (
    <div className={cn("fixed bottom-4 right-4 z-10", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full bg-white hover:bg-white/80 cursor-pointer ring-0 p-3 sm:p-4 shadow">
            <MenuIcon className="size-4 sm:size-5 text-slate-600" />
            <div className="rounded-full bg-slate-300 size-5 sm:size-6 ml-1.5"></div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 sm:w-56 space-y-2 py-4 px-2"
        >
          <DropdownMenuItem>
            <Link href="/dashboard/profile" className="font-bold w-full">
              View my page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="font-bold w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings" className="w-full">
              My account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/logout" className="w-full">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
