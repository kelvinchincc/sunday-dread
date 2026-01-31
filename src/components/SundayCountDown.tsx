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
  const nextSundayDiffHoursInTotal = nextSunday.diff(now, "hour");
  const sundayNear = nextSundayDiffHoursInTotal <= 6;
  const sundayHappeningSoon = nextSundayDiffHoursInTotal <= 1;

  const renderTitle = () => {
    if (now.day() === 1 && now.hour() < 12) {
      return <h1 className="text-center text-5xl">See you next Sunday! 😭</h1>;
    }

    if (sundayHappeningSoon) {
      return <h1 className="text-center text-5xl text-red-500 animate-bounce">STAY CALM, IT'S HAPPENING!</h1>;
    }

    if (sundayNear) {
      return <h1 className="text-center text-5xl text-gray-400 italic">Almost There...</h1>;
    }

    return <h1 className="text-center text-5xl">Is It Sunday Yet?</h1>;
  };

  return (
    <>
      {renderTitle()}
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
