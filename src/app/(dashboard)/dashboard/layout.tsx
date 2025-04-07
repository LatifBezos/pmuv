import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 bg-slate-100 flex-1 items-center">
      {/* TODO: Check if the creator has set up his payment account */}
      {true && (
        <div className="w-full p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 bg-orange-100">
          <p className="text-xs sm:text-sm font-bold text-center md:text-left">
            Please link your payout method to start receiving payments.
          </p>
          <Link href="/dashboard/settings">
            <Button className="rounded-full font-bold cursor-pointer text-xs sm:text-sm whitespace-nowrap">
              Complete setup
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 w-full px-4 pt-0">
        {children}
      </div>
    </div>
  );
}
