import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type MainLayoutProps = {
  cartCount: number;
};

export default function MainLayout({ cartCount }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar cartCount={cartCount} />
      <Outlet />
      <Footer />
    </div>
  );
}
