import type { Dayjs } from "dayjs";
import { Counter } from "./Counter";

interface MondayCountDownProps {
  now: Dayjs;
}

export function MondayCountDown({ now }: MondayCountDownProps) {
  const monday = now.startOf("day").day(1);
  const hoursUntilMonday = monday.diff(now, "hour");
  const minutesUntilMonday = monday.diff(now.add(hoursUntilMonday, "hour"), "minute");
  const secondsUntilMonday = monday.diff(
    now.add(hoursUntilMonday, "hour").add(minutesUntilMonday, "minute"),
    "second",
  );

  const renderTitle = () => {
    return <h1 className="text-center text-5xl">Happy Sunday!!!</h1>;
  };

  return (
    <>
      {renderTitle()}
      <section className="flex flex-row gap-3">
        <Counter value={hoursUntilMonday} label="Hours" />
        <Counter value={minutesUntilMonday} label="Minutes" />
        <Counter value={secondsUntilMonday} label="Seconds" />
      </section>
    </>
  );
}
