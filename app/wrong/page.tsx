"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Wrong() {
  const router = useRouter();
  useEffect(() => {
    const x = () => router.replace("/");
    setTimeout(x, 1500);
  });

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="text-4xl">❌ Wrong Details, please try again.</div>
    </div>
  );
}
