import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../components/Navbar.jsx";
import FlightCard from "../components/FlightCard.jsx";
import axios from 'axios';
import userContext from "../context/user/userContext.js";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    alert("Please log in to view your bookings.");
                    return;
                }

                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/getBookings`, {
                    userId: user.id
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setBookings(response.data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
                alert("Failed to fetch bookings");
            }
        };
        if(user) {
            fetchBookings();
        }
    }, []);

    return (
        <div className="bg-pink-light px-10 py-4 w-full h-screen overflow-scroll flex flex-col gap-10 items-center">
            <Navbar/>
            <div className="w-full flex justify-between">
                <span className="text-h3 font-light">My Bookings</span>
            </div>
            {bookings.length > 0 ? bookings.map((booking) => (
                <FlightCard
                    key={booking.id}
                    flightId={booking.flight.id}
                    departureLocation={booking.flight.departureLocation}
                    arrivalLocation={booking.flight.arrivalLocation}
                    name={booking.flight.name}
                    date={booking.flight.date}
                />
            )) : (
                <div className="text-b3">No bookings found</div>
            )}
        </div>
    );
};

export default Bookings;
