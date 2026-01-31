import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SundayCountDown } from "./components/SundayCountDown";

function App() {
  const [now, setNow] = useState(dayjs());
  const isTodaySunday = now.day() === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh grid place-items-center">
      <main className="flex flex-col gap-5 items-center">
        <SundayCountDown now={now} isTodaySunday={isTodaySunday} />
      </main>
    </div>
  );
}

export default App;
