import { useMemo, useState } from "react";
import { Counter } from "./Counter";
import type { Dayjs } from "dayjs";
import { CiCalendarDate } from "react-icons/ci";

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
          <div className="grid grid-cols-[auto_auto_1fr] gap-1">
            <p>Now </p>
            <p>:</p>
            <p>{now.format("DD MMM YYYY hh:mm:ss A")}</p>

            <p>Next Sunday</p>
            <p>:</p>
            <p>{nextSunday.format("DD MMM YYYY hh:mm:ss A")}</p>
          </div>
        )}
      </footer>

      <div
        className="tooltip tooltip-left absolute right-5 bottom-5"
        data-tip={`${showCurrentDate ? "Hide" : "Show"} Current Date`}
      >
        <button className="btn btn-primary btn-circle" onClick={() => setShowCurrentDate((prev) => !prev)}>
          <CiCalendarDate size={22} />
        </button>
      </div>
    </>
  );
}
