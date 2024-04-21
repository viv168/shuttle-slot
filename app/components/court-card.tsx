"use client";

import { Court } from "@shuttleslot/common";
import Image from "next/image";
import Link from "next/link";

const CourtCard = ({ court }: { court: Court }) => {
  return (
    <div className="group border-2 border-green-700 hover:bg-green-700 hover:border-transparent p-4 rounded-xl shadow-lg hover:shadow-md flex flex-row gap-4 m-4 items-center">
      <div className="text-green-700 h-full group-hover:text-white flex flex-col text-4xl md:text-5xl font-extrabold">
        {court.court_no}
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl">
          <Image
            src={court.img_file}
            alt={`Badminton Court: ${court.name}`}
            className="object-cover w-full h-48 md:h-64"
          />
        </div>
        <div className="mt-2">
          <h2 className="text-2xl font-semibold text-green-700 group-hover:text-white">
            {court.name}
          </h2>
          <p className="text-gray-700 group-hover:text-gray-300">
            at <span className="font-semibold">{court.location}</span>
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/new-booking">
            <button className="bg-green-700 text-white text-lg px-6 py-2 rounded-lg hover:bg-white hover:text-green-700 hover:border-green-700 border-2 border-green-700 transition duration-300 ease-in-out font-semibold">
              New Booking
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;
