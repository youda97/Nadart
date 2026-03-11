export default function Logo() {
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-xl font-bold text-stone-900 shadow-sm">
        <img src="icon.webp" alt="Nadart logo" className="rounded-full" />
      </div>
      <div>
        <div className="text-xl font-semibold tracking-tight text-stone-900">
          Nadart
        </div>
        <div className="text-xs uppercase tracking-[0.28em] text-stone-500">
          Acrylic on Canvas
        </div>
      </div>
    </div>
  );
}
