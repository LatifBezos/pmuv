import { HomeNavbar } from "@/layout/components/home-navbar";
import { Footer } from "@/layout/components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HomeNavbar />
      {children}
      <Footer />
    </main>
  );
}
