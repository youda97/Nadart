import { useEffect, useRef, useState } from "react";
import { usePaintings } from "../hooks/usePaintings";

type ReservedCountdownProps = {
  reservedUntil: string | null;
};

function formatTimeLeft(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ReservedCountdown({
  reservedUntil,
}: ReservedCountdownProps) {
  const { refetchPaintings } = usePaintings();

  const targetTime = reservedUntil ? new Date(reservedUntil).getTime() : null;

  const [now, setNow] = useState(() => Date.now());
  const hasRefetchedRef = useRef(false);

  const timeLeft = targetTime ? Math.max(0, targetTime - now) : 0;

  useEffect(() => {
    hasRefetchedRef.current = false;

    if (!targetTime) {
      return;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [targetTime]);

  useEffect(() => {
    if (!targetTime || timeLeft > 0 || hasRefetchedRef.current) {
      return;
    }

    hasRefetchedRef.current = true;
    void refetchPaintings();
  }, [targetTime, timeLeft, refetchPaintings]);

  if (!targetTime || timeLeft <= 0) {
    return null;
  }

  return (
    <span className="block text-[11px] font-medium normal-case tracking-normal text-white/95">
      Available again in {formatTimeLeft(timeLeft)}
    </span>
  );
}
