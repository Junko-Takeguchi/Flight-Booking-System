import React, { useContext } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import userContext from '../context/user/userContext.js';
import flightContext from '../context/flight/flightContext.js';

const FlightCard = ({
    flightId,
    departureLocation,
    arrivalLocation,
    date,
    name
}) => {
    const formattedDate = format(new Date(date), 'EEE, MMM d, h:mma');
    const { user } = useContext(userContext);

    const handleBook = async () => {
        if (!user) {
            alert("Please log in to book a flight");
            return;
        }
        const token = localStorage.getItem('userToken');
        if (!token) {
            alert("Please log in to book a flight");
            return;
        }
        console.log({
            flightId,
            seats: 1 // assuming 1 seat is being booked
        })
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/bookFlight`, {
                flightId,
                seats: 1 // assuming 1 seat is being booked
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                alert("Flight booked successfully!");
            } else {
                alert("Failed to book flight");
            }
        } catch (error) {
            console.error("Failed to book flight", error);
            alert(error.response.data.error || "Failed to book flight");
        }
    };

    return (
        <div className="flex flex-col w-full rounded-xl bg-pink border-2 border-black">
            <div className="flex justify-between rounded-t-xl items-center bg-yellow py-3 border border-b border-black px-2">
                <div>
                    <span className="text-title">{name} </span>
                </div>
                <button
                    className="bg-black items-center text-white flex gap-2 rounded-xl hover:bg-pink hover:text-black transition border border-black px-4 py-2"
                    onClick={handleBook}
                >
                    <span>Book</span>
                </button>
            </div>
            <div className="rounded-xl flex gap-3 justify-between">
                <div className="p-4 flex flex-col gap-5">
                    <span className="text-title">{departureLocation}</span>
                    <span className="text-b2">{formattedDate}</span>
                </div>
                <div className="p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div>
                <div className="p-4 flex justify-end">
                    <span className="text-title">{arrivalLocation}</span>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
