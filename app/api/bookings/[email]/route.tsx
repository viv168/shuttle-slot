import { Booking, UserBookingsData } from "@shuttleslot/common";
import { loadDB } from "@shuttleslot/lib";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const db = await loadDB();

  const email = params.email;

  const bookings: Booking[] = await db.all(
    "SELECT * FROM booking WHERE email = ?",
    email
  );

  const data: UserBookingsData = { bookings };

  return Response.json({ data });
}
