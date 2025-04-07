import { EarningWaysSection } from "@/layout/dashboard/ui/sections/dashboard-section/earning-ways-section";
import { ProfileSection } from "@/layout/dashboard/ui/sections/dashboard-section/profile-section";
import { SupportersSection } from "@/layout/dashboard/ui/sections/dashboard-section/supporters-section";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-8">
      <ProfileSection />
      <SupportersSection />
      <EarningWaysSection />
    </div>
  );
}
