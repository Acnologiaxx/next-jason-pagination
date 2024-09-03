'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  const [counter, setCounter] = useState(3);

  const decrementCounter = useCallback(() => {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(decrementCounter, 1000);
      return () => clearTimeout(timer);
    } else {
      push("/users");
    }
  }, [counter, decrementCounter, push]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <p className="text-6xl font-bold">{counter}</p>
        <p className="text-lg font-semibold">Redirecting to users page...</p>
      </div>
    </main>
  );
}