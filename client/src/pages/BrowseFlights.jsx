import React, {useContext, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import flightContext from "../context/flight/flightContext.js";
import FlightCard from "../components/FlightCard.jsx";
import axios from "axios";

const BrowseFlights = () => {
    const {flights, setFlights} = useContext(flightContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const departureLocation = searchParams.get("departureLocation");
        const arrivalLocation = searchParams.get("arrivalLocation");
        const passengers = searchParams.get("passengers");
        const date = searchParams.get("date");
        const name = searchParams.get("name");
        const token = localStorage.getItem("userToken");

        if (!token) {
            alert("Please Login");
        } else {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/searchFlight`, {
                departureLocation,
                arrivalLocation,
                date,
                passengers,
                name
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.data)
                .then(data => {
                    setFlights(data);
                })
                .catch(e => console.log(e));
        }
    }, [searchParams, setFlights]);

    return (
        <div className="bg-pink-light px-10 py-4 w-full h-full flex flex-col gap-16 items-center">
            <Navbar/>
            <Hero/>
            <div className="flex w-full">
                <span className="text-title">
                    Available Flights
                </span>
            </div>
            {flights && flights.map((flight) => (
                <FlightCard
                    key={flight.id}
                    flightId={flight.id}
                    departureLocation={flight.departureLocation}
                    arrivalLocation={flight.arrivalLocation}
                    name={flight.name}
                    date={flight.date}
                />
            ))}
        </div>
    );
};

export default BrowseFlights;