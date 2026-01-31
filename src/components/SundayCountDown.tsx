import { useMemo, useState } from "react";
import { Counter } from "./Counter";
import type { Dayjs } from "dayjs";

interface SundayCountDownProps {
  now: Dayjs;
  isTodaySunday: boolean;
}

export function SundayCountDown({ now, isTodaySunday }: SundayCountDownProps) {
  const [showCurrentDate, setShowCurrentDate] = useState(false);
  const nextSunday = useMemo(() => {
    if (isTodaySunday) {
      return now.startOf("day");
    }

    return now.startOf("day").day(7);
  }, [isTodaySunday, now]);

  const nextSundayDiffDay = nextSunday.diff(now, "day");
  const nextSundayDiffHour = nextSunday.diff(now.add(nextSundayDiffDay, "day"), "hour");
  const nextSundayDiffMinute = nextSunday.diff(
    now.add(nextSundayDiffDay, "day").add(nextSundayDiffHour, "hour"),
    "minute",
  );
  const nextSundayDiffSecond = nextSunday.diff(
    now.add(nextSundayDiffDay, "day").add(nextSundayDiffHour, "hour").add(nextSundayDiffMinute, "minute"),
    "second",
  );

  return (
    <>
      <h1 className="text-center text-5xl">My Happy Sunday Still Have</h1>
      <div className="flex gap-3">
        <Counter value={nextSundayDiffDay} label="Days" />
        <Counter value={nextSundayDiffHour} label="Hours" />
        <Counter value={nextSundayDiffMinute} label="Minutes" />
        <Counter value={nextSundayDiffSecond} label="Seconds" />
      </div>
      <footer className="text-xs flex flex-col gap-2 items-center">
        {showCurrentDate && (
          <div>
            <p>Now: {now.format("DD MMM YYYY HH:mm:ss")}</p>
            <p>Next Sunday: {nextSunday.format("DD MMM YYYY HH:mm:ss")}</p>
          </div>
        )}

        <button className="btn btn-primary btn-outline" onClick={() => setShowCurrentDate((prev) => !prev)}>
          {showCurrentDate ? "Hide" : "Show"} Date
        </button>
      </footer>
    </>
  );
}
