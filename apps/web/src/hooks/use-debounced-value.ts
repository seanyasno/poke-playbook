import { useEffect, useState } from "react";

export function useDebouncedValue<Value>(value: Value, delay: number): Value {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
} 