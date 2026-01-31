import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MondayCountDown } from "./components/MondayCountDown";
import { SundayCountDown } from "./components/SundayCountDown";

const getNow = () => dayjs().day(0);

function App() {
  const [now, setNow] = useState(getNow());
  const isTodaySunday = now.day() === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getNow());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh grid place-items-center">
      <main className="flex flex-col gap-5 items-center">
        {isTodaySunday || <SundayCountDown now={now} isTodaySunday={isTodaySunday} />}
        {isTodaySunday && <MondayCountDown now={now} />}
      </main>
    </div>
  );
}

export default App;
