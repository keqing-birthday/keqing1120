import { useState, useEffect } from 'react';

function getTargetDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const target = new Date(currentYear, 10, 20, 0, 0, 0); // 11月 = 10

  if (now > target) {
    return new Date(currentYear + 1, 10, 20, 0, 0, 0);
  }
  return target;
}

function calculateTimeLeft(target) {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function useCountdown() {
  const [targetDate] = useState(getTargetDate);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, targetDate };
}