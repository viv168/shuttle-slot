import { UserBalanceData } from "@shuttleslot/common";
import { loadDB } from "@shuttleslot/lib";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const db = await loadDB();

  const email = params.email;

  const row = await db.get("SELECT balance FROM user WHERE email = ?", email);

  const balance: number = row ? row.balance : 0;

  const data: UserBalanceData = { balance };

  return Response.json({ data });
}
