type SectionTitleProps = {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
};

export default function SectionTitle({
  title,
  action,
  onAction,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-8 flex items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="hidden sm:block h-[3px] w-10 bg-[#b99a64]" />
        <h2
          className={`font-bold tracking-tight text-stone-900 md:text-3xl ${
            action ? "text-xl" : "text-2xl"
          }`}
        >
          {title}
        </h2>
      </div>

      {action ? (
        <button
          onClick={onAction}
          className="border-b border-stone-900 pb-1 text-xs uppercase tracking-[0.18em] text-stone-800 transition hover:text-[#b99a64]"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}
