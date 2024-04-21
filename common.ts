// type and constants declarations

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type User = {
	email: string;
	pwd_hash: string;
	first_name: string;
	last_name: string;
	balance: number;
}

export type Court = {
	court_no: number;
	name: string;
	location: string;
	img_file: StaticImport;
}

export type Booking = {
	booking_id: number;
	email: string;
	booking_dt: string;
	slot_date: string;
	slot_hour: number;
	court: number;
	hours: number;
}

export type UserBookingsData = {
	bookings: Booking[]
}

export type UserBalanceData = {
	balance: number
}

export type AvailableHoursData = {
	availableHours: number[];
}

import court_1_img from "./res/images/courts/court-1.jpg";
import court_2_img from "./res/images/courts/court-2.jpg";

export const COURTS: Court[] = [
	{
		court_no: 1,
		name: "Court A",
		location: "Indoor Hall",
		img_file: court_1_img
	},
	{
		court_no: 2,
		name: "Court B",
		location: "Outdoor Field",
		img_file: court_2_img
	},
]

export enum LoadingState {
	NotLoaded = "Could not load data",
	Loading = "Loading, please wait",
	Loaded = "Loaded, time to relish!"
}

export type EitherIs<T> = T | undefined;

export type NewBookingData = {
	email: EitherIs<string>;
	court: EitherIs<number>;
	slotDate: EitherIs<string>;
	startHour: EitherIs<number>;
	duration: EitherIs<number>;
}

export function monthToNumber(month: string): string {
	const months = {
		January: "01",
		February: "02",
		March: "03",
		April: "04",
		May: "05",
		June: "06",
		July: "07",
		August: "08",
		September: "09",
		October: "10",
		November: "11",
		December: "12",
	};
	return months[month as keyof typeof months];
}
