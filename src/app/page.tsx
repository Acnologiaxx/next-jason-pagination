'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push("/users");
    }
  }, [counter, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <p className="text-6xl font-bold">{counter}</p>
        <p className="text-lg font-semibold">Redirecting to users page...</p>
      </div>
    </main>
  );
}
