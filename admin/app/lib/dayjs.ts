import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export default dayjs;

export function useDate(interval = 1000) {
  const [date, setDate] = useState(() => dayjs());
  useEffect(() => {
    const i = setInterval(() => setDate(dayjs()), interval);
    return () => clearInterval(i);
  }, []);
  return date;
}
