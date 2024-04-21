import { AvailableHoursData } from "@shuttleslot/common";
import { loadDB } from "@shuttleslot/lib";

export async function GET(
  req: Request,
  { params }: { params: { date: string; court: number } }
) {
  const db = await loadDB();

  const { date, court } = params;
  console.log("actual date::", date);

  const totalHours = 24;

  const bookedHours = await db.all(
    "SELECT slot_hour, hours FROM booking WHERE slot_date = ? AND court = ?",
    date,
    court
  );

  console.log("date::", date);

  const bookedSlots = new Array(totalHours).fill(false);

  bookedHours.forEach((booking) => {
    const startHour = booking.slot_hour;
    const endHour = startHour + booking.hours;
    for (let i = startHour; i < endHour; i++) {
      bookedSlots[i] = true;
    }
  });

  const availableHours = [];
  for (let i = 0; i < totalHours; i++) {
    if (!bookedSlots[i]) {
      availableHours.push(i);
    }
  }

  const data: AvailableHoursData = { availableHours };

  return Response.json({ data });
}
