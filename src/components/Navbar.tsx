import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

type NavbarProps = {
  cartCount: number;
};

export default function Navbar({ cartCount }: NavbarProps) {
  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-[#f8f1e7]/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2 text-stone-900 shadow-sm transition hover:border-stone-400"
        >
          <span className="relative inline-flex">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
          </span>
          <span className="text-sm font-medium">Cart</span>
        </Link>
      </div>
    </header>
  );
}
