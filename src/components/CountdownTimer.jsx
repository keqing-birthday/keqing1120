import { useCountdown } from '../hooks/useCountdown';
import Glass from './Glass';

function CountdownCard({ value, label }) {
  return (
    <Glass className="p-4 md:p-6 text-center min-w-[80px] md:min-w-[120px]" cornerRadius={16}>
      <div className="text-3xl md:text-5xl font-bold tabular-nums gradient-text">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-[var(--text-secondary)] tracking-wider mt-1">
        {label}
      </div>
    </Glass>
  );
}

export default function CountdownTimer() {
  const { timeLeft, targetDate } = useCountdown();
  const year = targetDate.getFullYear();

  return (
    <div className="text-center">
      <p className="text-sm md:text-base text-[var(--text-secondary)] mb-4">
        距离 {year} 年11月20日刻晴生日还有
      </p>
      <div className="flex gap-3 md:gap-4 justify-center">
        <CountdownCard value={timeLeft.days} label="天" />
        <CountdownCard value={timeLeft.hours} label="时" />
        <CountdownCard value={timeLeft.minutes} label="分" />
        <CountdownCard value={timeLeft.seconds} label="秒" />
      </div>
    </div>
  );
}
