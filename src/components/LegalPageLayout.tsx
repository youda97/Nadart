import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import SectionTitle from "./SectionTitle";

type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  subtitle,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f3eb] pt-19">
      <div className="border-b border-stone-200 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 text-sm text-stone-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-stone-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800">{title}</span>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-10">
            <SectionTitle title={title} className="mx-auto max-w-[1120px]" />
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="prose prose-stone max-w-none prose-headings:text-stone-900 prose-p:text-stone-700 prose-li:text-stone-700 space-y-4">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
