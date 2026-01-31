interface CounterProps {
  value: number;
  label: string;
}

export function Counter({ value, label }: CounterProps) {
  return (
    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-center">
      <span className="countdown">
        <span
          style={{ "--value": value, "--digits": 2 } as React.CSSProperties}
          aria-live="polite"
          className="text-5xl"
        >
          {value}
        </span>
      </span>

      <div>{label}</div>
    </div>
  );
}
