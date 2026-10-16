import { useState, useEffect } from 'react';
import { siteConfig } from '../config/site.config';

function getTargetDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const { month, day } = siteConfig.birthday;
  const target = new Date(currentYear, month - 1, day, 0, 0, 0);

  if (now > target) {
    return new Date(currentYear + 1, month - 1, day, 0, 0, 0);
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
  const [targetDate, setTargetDate] = useState(getTargetDate);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now >= targetDate) {
        // 已到达目标时间（用户跨着 0 点一直挂着页面）：滚动到下一个目标日期
        setTargetDate(getTargetDate());
      }
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, targetDate };
}