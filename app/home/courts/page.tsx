import { COURTS } from "@shuttleslot/common";
import { CourtCard } from "../../components";

export default async function Home() {
  return (
    <>
      <div className="flex-1 mt-3 grid grid-flow-col grid-rows-2 md:grid-flow-row md:grid-cols-3 gap-5 p-3">
        {COURTS.map((court) => (
          <CourtCard key={court.court_no} court={court} />
        ))}
      </div>
    </>
  );
}
