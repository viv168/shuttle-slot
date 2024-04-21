import { getSession } from "@shuttleslot/lib";
import { redirect, RedirectType } from "next/navigation";
import { ShuttleForm } from "../components";

export default async function NewBooking() {
  const session = await getSession();
  if (!session) {
    redirect("/", RedirectType.replace);
  } else {
    return (
      <>
        <div className="text-2xl font-semibold">
          Hey{" "}
          <span className="drop-shadow-[0_25px_25px_#0097a7] font-bold text-cyan-700 text-3xl">
            {session.user.first_name}
          </span>
          , let's book a{" "}
          <span className="drop-shadow-[0_25px_25px_#3b82f6] font-bold text-blue-500 text-3xl">
            Shuttle Slot
          </span>
        </div>
        <div className="text-2xl mt-3">Please enter the details:</div>
        <ShuttleForm email={session.user.email} />
      </>
    );
  }
}
