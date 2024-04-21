"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  const signOut = async () => {
    await axios.get("/api/logout");
    router.replace("/");
  };
  return (
    <button
      onClick={signOut}
      className="w-fit bg-black text-white hover:bg-white hover:text-black shadow-2xl hover:shadow-black rounded-full p-1 px-4"
    >
      Log Out
    </button>
  );
}
