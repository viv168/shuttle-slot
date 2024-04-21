import * as React from "react";

import { getSession } from "@shuttleslot/lib";
import { Bookings } from "@shuttleslot/app/components";

export default async function UserBookings() {
  const session = await getSession();
  const userEmail = session?.user?.email || "";
  return <Bookings email={userEmail} />;
}
