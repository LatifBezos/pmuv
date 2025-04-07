import { EarningWaysSection } from "@/layout/dashboard/ui/sections/dashboard-section/earning-ways-section";
import { ProfileSection } from "@/layout/dashboard/ui/sections/dashboard-section/profile-section";
import { SupportersSection } from "@/layout/dashboard/ui/sections/dashboard-section/supporters-section";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-screen md:max-w-4xl mx-auto px-4 sm:px-6 pb-8 py-12 md:py-0">
      <ProfileSection />
      <SupportersSection />
      <EarningWaysSection />
    </div>
  );
}
