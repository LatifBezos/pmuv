import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 bg-slate-100 flex-1 items-center">
      <div className="flex flex-1 flex-col gap-4 w-full pt-0">{children}</div>
    </div>
  );
}
