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
        <div className="w-full p-4 flex items-center justify-center space-x-4 bg-orange-100">
          <p className="text-sm font-bold">
            Please link your payout method to start receiving payments.
          </p>
          <Link href="/dashboard/settings">
            <Button className="rounded-full font-bold cursor-pointer">
              Complete setup
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-w-4xl">
        {children}
      </div>
    </div>
  );
}
