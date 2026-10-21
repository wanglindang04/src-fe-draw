import { useCallback, useEffect, useState } from "react";

// Đếm ngược theo giây (vd: thời gian chờ gửi lại OTP)
export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const restart = useCallback(() => setRemaining(seconds), [seconds]);

  return { remaining, restart };
}
