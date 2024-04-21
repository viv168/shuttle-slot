import { getSession } from "@shuttleslot/lib";
import axios from "axios";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { BalanceText, SignoutButton } from "../components";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/", RedirectType.replace);
  } else {
    const userEmail = session.user.email;
    return (
      <>
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between">
          <div className="text-2xl font-semibold">
            Hey{" "}
            <span className="drop-shadow-[0_25px_25px_#0097a7] font-bold text-cyan-700 text-3xl">
              {session.user.first_name}
            </span>
            , welcome to{" "}
            <span className="drop-shadow-[0_25px_25px_#3b82f6] font-bold text-blue-500 text-3xl">
              ShuttleSlot
            </span>{" "}
            Dashboard.
          </div>
          <SignoutButton />
        </div>
        <div className="text-2xl mt-3">How would you like to proceed?</div>
        <div className="flex flex-row justify-around">
          <Link href="/home/bookings">
            <button className="text-xl mt-5 text-white hover:font-bold p-3 bg-cyan-700 mb-3 rounded-xl">
              Bookings
            </button>
          </Link>
          <Link href="/home/courts">
            <button className="text-xl mt-5 text-white hover:font-bold p-3 bg-cyan-700 mb-3 rounded-xl">
              Courts
            </button>
          </Link>
          <BalanceText email={userEmail} />
        </div>
        {children}
      </>
    );
  }
}
