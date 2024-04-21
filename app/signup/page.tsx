import { redirect, RedirectType } from "next/navigation";
import { getSession, signup } from "@shuttleslot/lib";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/home/bookings", RedirectType.replace);
  }
  return (
    <section className="flex-1 flex flex-row p-5">
      <div className="px-10 flex flex-col items-start justify-center text-7xl font-semibold text-blue-950">
        <div>Welcome</div>
        <div>to</div>
        <div className="text-blue-700 drop-shadow-[0_25px_25px_#0097a7]">
          ShuttleSlot
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <form
          action={async (formData) => {
            "use server";
            await signup(formData);
            redirect("/", RedirectType.replace);
          }}
          className="flex flex-col gap-5 text-xl w-full items-center justify-center"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl w-2/3"
          />
          <div className="flex flex-row w-2/3 gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl flex-1"
              minLength={5}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl flex-1"
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl w-2/3"
            minLength={8}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white hover:bg-white hover:text-blue-700 shadow-2xl hover:shadow-blue-700 rounded-full p-3 px-20"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
