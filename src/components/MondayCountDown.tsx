import type { Dayjs } from "dayjs";
import { useState } from "react";
import { Counter } from "./Counter";
import { CiCalendarDate } from "react-icons/ci";

interface MondayCountDownProps {
  now: Dayjs;
}

export function MondayCountDown({ now }: MondayCountDownProps) {
  const [showCurrentDate, setShowCurrentDate] = useState(false);

  const monday = now.startOf("day").day(1);
  const hoursUntilMonday = monday.diff(now, "hour");
  const minutesUntilMonday = monday.diff(now.add(hoursUntilMonday, "hour"), "minute");
  const secondsUntilMonday = monday.diff(
    now.add(hoursUntilMonday, "hour").add(minutesUntilMonday, "minute"),
    "second",
  );

  const isMondayNear = hoursUntilMonday <= 6;
  const isMondayHappeningSoon = hoursUntilMonday <= 1;

  const renderTitle = () => {
    if (isMondayHappeningSoon) {
      return <h1 className="text-center text-5xl text-red-500 animate-bounce">😱 Monday is Coming! 😱</h1>;
    }

    if (isMondayNear) {
      return <h1 className="text-center text-5xl">Brace Yourself, Monday is Near...</h1>;
    }

    return <h1 className="text-center text-5xl">🎉 Happy Sunday! 🎉</h1>;
  };

  return (
    <>
      {renderTitle()}
      <section className="flex flex-row gap-3">
        <Counter value={hoursUntilMonday} label="Hours" />
        <Counter value={minutesUntilMonday} label="Minutes" />
        <Counter value={secondsUntilMonday} label="Seconds" />
      </section>

      {showCurrentDate && (
        <footer className="grid grid-cols-[auto_auto_1fr] gap-1 text-xs">
          <p>Now </p>
          <p>:</p>
          <p>{now.format("DD MMM YYYY hh:mm:ss A")}</p>

          <p>Next Monday</p>
          <p>:</p>
          <p>{monday.format("DD MMM YYYY hh:mm:ss A")}</p>
        </footer>
      )}
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
