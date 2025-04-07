import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
export function ProfileFloatButton() {
  return (
    <div className="absolute top-24 right-24">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full bg-white hover:bg-white/80 cursor-pointer ring-0 py-6">
            <MenuIcon className="size-5 text-slate-600" />
            <div className="rounded-full bg-slate-300 size-6"></div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 space-y-2 py-4 px-2">
          <DropdownMenuItem>
            <Link href="/dashboard/profile" className="font-bold">
              View my page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="font-bold">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings">My account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/logout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
