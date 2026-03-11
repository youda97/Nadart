import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[url('/textures/content-bg.webp')] bg-cover bg-center pt-[77px]">
      {/* soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,155,78,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,121,55,0.14),_transparent_28%)]" />

      <div className="relative mx-auto flex max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 md:min-h-[calc(100vh-77px)] md:px-8 md:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* left content */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d6c2a0] bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-stone-700 sm:text-xs">
              Nadart Collection
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Where <span className="text-[#ad7616]">Faith</span>
              <br />
              Meets the <span className="text-[#ad7616]">Canvas</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-stone-700 sm:text-lg">
              A curated storefront for Nada’s original paintings. Browse Islamic
              pieces, Arabic calligraphy, sacred architecture, and expressive
              canvas work.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black sm:px-7 sm:py-4"
              >
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* right image */}
          <div className="relative hidden h-full items-center justify-end md:flex">
            <div className="relative w-full">
              <img
                src="/hero/hero-painting.webp"
                alt="Featured Nadart painting"
                className="ml-auto h-[90vh] w-auto object-contain"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
