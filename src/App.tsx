import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Counter } from "./components/Counter";

function App() {
  const [now, setNow] = useState(dayjs());
  const [showCurrentDate, setShowCurrentDate] = useState(false);

  const isTodaySunday = now.day() === 0;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh grid place-items-center">
      <main className="flex flex-col gap-5 items-center">
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
      </main>
    </div>
  );
}

export default App;
