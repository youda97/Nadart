import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-stone-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="text-lg font-semibold text-[#c2a476]">Nadart</div>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Original acrylic paintings by Nada. A curated collection of
              Islamic art, Arabic calligraphy, sacred architecture, and
              expressive canvas work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2a476]">
                Explore
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-stone-300">
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
                <Link to="/collection" className="transition hover:text-white">
                  Collection
                </Link>
                <a
                  href="https://instagram.com/nadart_815"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2a476]">
                Legal
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-stone-300">
                <Link
                  to="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-sm text-stone-400 md:text-left">
          © {new Date().getFullYear()} Nadart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
