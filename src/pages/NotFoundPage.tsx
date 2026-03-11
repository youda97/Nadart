import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-[calc(77px+6rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,155,78,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,121,55,0.14),_transparent_28%)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="border border-[#d8c4a1] bg-white/80 p-8 text-center shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[#b99a64]">
            Error 404
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            This page seems to have wandered off
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-stone-700 sm:text-lg">
            The page you tried to open does not exist. You can return to the
            homepage or continue browsing the collection.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
            >
              Go home
            </Link>

            <Link
              to="/collection"
              className="inline-flex items-center justify-center border border-[#c6a468] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#b99a64] transition hover:bg-[#faf6ef]"
            >
              Browse paintings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
