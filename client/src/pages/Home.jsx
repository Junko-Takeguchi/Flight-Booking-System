import React, {useContext} from 'react';
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import FlightCard from "../components/FlightCard.jsx";
import flightContext from "../context/flight/flightContext.js";
import {useNavigate} from "react-router-dom";

const getUniqueFlightsByName = (flights) => {
    if(flights){
        const uniqueNames = new Set();
        const uniqueFlights = [];
        flights.forEach((flight) => {
            if (!uniqueNames.has(flight.name)) {
                uniqueNames.add(flight.name);
                uniqueFlights.push(flight);
            }
        });
        return uniqueFlights;
    }
};

const Home = () => {

    const {flights} = useContext(flightContext);
    const topFlights = getUniqueFlightsByName(flights);
    const navigate = useNavigate();

    return (
        <div className="bg-pink-light px-10 py-4 w-full h-full flex flex-col gap-16 items-center">
            <Navbar/>
            <Hero isHomePage={true}/>
            <div className="w-full flex justify-between">
                <span className="text-h3 font-light">Top Flights</span>
                <span
                    className="text-b1 hover:underline hover:underline-offset-8 hover:decoration-black hover:cursor-pointer"
                    onClick={() => navigate("/flights")}
                >Browse all Flights</span>
            </div>
            {topFlights && topFlights.map((flight) => (
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

export default Home;