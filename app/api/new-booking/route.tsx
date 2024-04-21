import { loadDB } from "@shuttleslot/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data = await req.json();

  console.log("api data", data);

  const { email, court, slotDate, startHour, duration } = data;

  const cost = 100 * duration;

  // Get the current date and time for booking_dt
  const bookingDt = new Date().toISOString();

  const insertBookingStatement = `
    INSERT INTO booking(email, court, booking_dt, slot_date, slot_hour, hours)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const updateUserStatement = `
    UPDATE user
    SET balance = balance - ?
    WHERE email = ?
  `;

  try {
    await db.run("BEGIN TRANSACTION");

    await db.run(
      insertBookingStatement,
      email,
      court,
      bookingDt,
      slotDate,
      startHour,
      duration
    );

    await db.run(updateUserStatement, cost, email);

    await db.run("COMMIT");

    // Return success response
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("Error inserting data:", error);
  }

  return new Response("Data successfully inserted!", { status: 200 });
}
