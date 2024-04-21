"use client";

import { Booking, LoadingState } from "@shuttleslot/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function convertToHour(hourString: number) {
  const newHourString = `${hourString.toString().padStart(2, "0")}:00`;
  return newHourString;
}

export default function Bookings({ email }: { email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

  useEffect(() => {
    const fn = async () => {
      console.log("email", email);
      const bookings = (
        await axios.get(`http://localhost:3000/api/bookings/${email}`)
      ).data.data.bookings;
      console.log(bookings);
      setBookings(bookings);
      setLoadingState(LoadingState.Loaded);
    };
    setTimeout(() => {
      try {
        fn();
      } catch {
        setLoadingState(LoadingState.NotLoaded);
      }
    }, 1000);
  }, []);

  if (loadingState === LoadingState.Loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  }
  return (
    <>
      <div className="w-full overflow-x-scroll md:overflow-hidden">
        <table className="md:w-full border-2 border-black">
          <thead className="md:w-full">
            <tr className="md:w-full md:flex md:flex-row">
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Booking ID
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Booking Date
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Court
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Slot Date
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Slot Hour
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Duration
              </th>
              <th className="w-fit px-2 md:flex-1 border-2 border-black bg-purple-700 text-white font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="md:w-full">
            {bookings.map((booking) => (
              <tr
                key={`${booking.booking_dt}-${email}`}
                className="md:w-full md:flex md:flex-row"
              >
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {booking.booking_id}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {new Date(booking.booking_dt).toLocaleString()}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {booking.court}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {booking.slot_date}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {convertToHour(booking.slot_hour)}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  {booking.hours}
                </td>
                <td className="w-fit px-2 text-center md:flex-1 border-2 border-black">
                  💵 {booking.hours * 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
