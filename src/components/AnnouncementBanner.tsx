import { Heart } from "lucide-react";

export default function AnnouncementBanner() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
        <Heart className="hidden h-4 w-4 shrink-0 text-[#c2a476] md:block" />

        <span>
          <span className="font-semibold text-[#c2a476]">
            Art with purpose —
          </span>{" "}
          10% of every purchase supports relief efforts across Palestine.
        </span>
      </div>
    </div>
  );
}
