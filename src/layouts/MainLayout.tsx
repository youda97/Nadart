import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBanner from "../components/AnnouncementBanner";

type MainLayoutProps = {
  cartCount: number;
};

export default function MainLayout({ cartCount }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <AnnouncementBanner />
      <Navbar cartCount={cartCount} />
      <Outlet />
      <Footer />
    </div>
  );
}
