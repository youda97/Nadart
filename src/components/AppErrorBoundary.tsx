import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AppErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative overflow-hidden py-24 h-lvh">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,155,78,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,121,55,0.14),_transparent_28%)]" />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="border border-[#d8c4a1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-12">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d6c2a0] bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-stone-700 sm:text-xs">
                Nadart
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                Something went wrong
              </h1>

              <p className="mt-5 text-base leading-8 text-stone-700 sm:text-lg">
                We ran into an unexpected issue while loading this page. Please
                return home or continue browsing the collection.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
                >
                  Return home
                </Link>

                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center border border-[#c6a468] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#b99a64] transition hover:bg-[#faf6ef]"
                >
                  View collection
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
