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
import { logOut } from "@/hooks/auth0";
import createClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface ProfileFloatButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileFloatButton({
  className,
  ...props
}: ProfileFloatButtonProps) {
  const [creatorSlug, setCreatorSlug] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCreatorSlug() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data, error } = await supabase
        .from("creators")
        .select("slug")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!error && isMounted) {
        setCreatorSlug(data?.slug ?? null);
      }
    }

    loadCreatorSlug();

    return () => {
      isMounted = false;
    };
  }, []);

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
            {creatorSlug ? (
              <Link
                href={`/creator/${creatorSlug}`}
                className="font-bold w-full"
                target="_blank"
              >
                View my page
              </Link>
            ) : (
              <span className="font-bold text-muted-foreground">
                Page non configurée
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="font-bold w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-full text-muted-foreground">
              My account bientôt disponible
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={logOut} className="cursor-pointer">
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
