import React, {useCallback, useContext, useState} from 'react';
import flightContext from "../context/flight/flightContext.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Hero = ({isHomePage}) => {
    const [selectedDate, setSelectedDate] = useState((new Date()));
    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");
    const [passengers, setPassengers] = useState(1);
    const navigate = useNavigate();

    const {setFlights} = useContext(flightContext);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");

        if (!token) {
            alert("Please Login");
            return;
        }

        console.log(JSON.stringify({
            departureLocation,
            arrivalLocation,
            date: new Date(selectedDate).toISOString(),
            passengers,
        }));

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/searchFlight`, {
                departureLocation,
                arrivalLocation,
                date: new Date(selectedDate).toISOString(),
                passengers,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const flights = response.data;
            setFlights(flights);
            navigate(`/flights?departureLocation=${departureLocation}&arrivalLocation=${arrivalLocation}&passengers=${passengers}&date=${new Date(selectedDate).toISOString()}`);
        } catch (error) {
            console.error("Failed to search flights", error);
            alert("Failed to search flights");
        }
    }, [departureLocation, arrivalLocation, selectedDate, passengers]);



    if (isHomePage) {
        return (
            <div className="p-2 rounded-xl bg-pink border border-black w-full flex flex-col">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-3">
                        <span className="text-h3 font-light">TRAVEL WITH US</span>
                        <span className="font-semibold text-title italic">DISCOVER <span className="font-light">THE WORLD</span></span>
                    </div>
                    <div>
                        <svg
                            version="1.1"
                            viewBox="0 0 2048 1962"
                            width="300"
                            height="150"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path transform="translate(0)" d="m0 0h2048v1962h-2048z" fill="#F5EAE2"/>
                            <path transform="translate(1024,328)" d="m0 0h39l28 1 35 3 36 5 35 7 20 5 25 8 29 10 29 12 26 12 22 11 23 13 21 12 17 11 19 13 17 13 14 11 13 11 11 9 17 16 12 11 4 5 5 4 7 8 8 8 9 11 11 13 9 12 12 15 13 19 11 17 15 25 13 24 10 19 13 29 12 30 12 36 7 25 7 29 6 32 5 37 3 38v57l-3 43-4 30-9 48-9 35-9 29-13 35-15 35-9 19-12 22-16 27-12 18-13 19-10 13-11 14-14 17-10 11-7 8-12 13-15 15-8 7-14 13-11 9-13 11-16 12-18 13-15 10-16 10-25 15-33 17-19 9-24 10-30 11-38 12-37 9-34 7-33 5-33 3-16 1h-49l-37-3-44-6-37-7-36-9-29-9-28-10-29-12-28-13-27-14-20-12-19-12-25-17-16-12-13-10-11-9-13-11-24-22-23-23-7-8-9-10-9-11-13-16-12-16-12-17-19-29-14-24-14-27-13-27-11-27-11-30-8-26-9-36-7-34-6-43-3-33-1-21v-23l1-28 3-36 6-41 8-38 8-31 13-41 11-28 11-25 14-29 14-26 8-13 12-19 13-19 11-15 11-14 12-14 9-11 12-13 9-10 24-24 8-7 14-12 11-9 16-13 20-15 24-16 22-14 25-14 19-10 23-11 37-15 28-10 30-9 36-9 31-6 29-4 18-2z" fill="#2F3132"/>
                            <path transform="translate(1057,373)" d="m0 0h63l14 2 12 5 22 13 16 9 9 6 5 5 1 4-3 10-7 4-8 2h-8l-8-1-10 4-5 6-15 22-6 7-5-1-8-5-5-5-9-10-10-12-2-4 1-8 2-4 2-8v-6l-2-4-8-4-13-3-11-1-19 1-18 3-12 5-10 8v1l20-1h31l12 2 1 1-1 7-7 8-9 8-18 12-9 5-2 2-6-1-8-4-10-9-5-4-6-2h-8l-12 5-9 5-10 2-1-4-5-2-3-1h-10l-8 4-7 8-10 5-11 4-2 2v7l6 3 1 4 16 1 4 1-6 12-2 6-1 10 10-1 8-5 13-13 7-6 7-8 9-11 7-7 5-8 8-1 5 3 7 7 6 9 6 7v2h28l9 4 8 6 8 11 9 16 6 14 4 16v16l-1 1h-17l-16-4-6-5-1-7 3-3 7-4 7-8-1-7-4-1h-7l-9 5-7 7-5 7-2 1h-8l-8-4-8-8-5-2-4 2-1 2 1 10 7 11 5 3 17 8 10 3-1 4-8 10-5 4-10 3h-13l-15-4-15-6-7 1-3 9v8l-7 7-13 5-18 6-12 11-9 12-7 11-7 10-7 8-11 4-10 2-10 4-5 5-3 5-8 17-3 10-3 23 1 9v13l-1 1-15 1-3-2-1-10 3-16 2-7-3-6-7-8-10-7-12-6-6-2h-8l-9 3-10 6-10 7-16 7-12 5-9 6-4 9-4 24v38l4 14 9 4 10-1 8-5 4-2 6-7 6-4 6-1 5 3 4 5 1 4v9l-3 9-9 12-4 6 1 7 1 1h27l6 4 1 3 1 11v13l-2 14v9l3 14 5 5 4 2h8l10-3 7-3 9 2 2 2v6h13l12-7 11-8 4-5 7-11 6-8 5-4 6-1 5 7 3 16 5 6 19 5 25 5 21 3 20 6 10 7 7 8 9 15 5 6 6 4 4 1 33 2 16 3 12 5 11 6 11 11 6 10 6 16 7 23 7 8 10 7 17 8 34 12 20 5 6 1h11l8-2 8-4 4-1h13l11 6 6 5 8 10 3 8v11l-7 12-9 11-9 10-8 7-4 5-8 7-12 13-9 14-1 7 7 9 3 9-1 10-4 10-9 13-14 14-16 9-15 5-27 7-6 4-6 10-10 19-10 16-11 14-5 3h-2l-1 3-8 4-21 3-22 3-9 5-11 9-1 2h-2l-2 4-8 8-10 15-7 19-5 20-3 14-7 7-5-2-9-7-7-10-9-15-12-21-13-22-8-16-4-11-7-23-3-16-1-9v-20l2-19 1-22v-12l-2-14-4-8-12-13-13-12-11-9-15-14-10-9-7-8-7-7-11-15-16-27-10-19-6-14-5-18 1-14 9-17 10-14 9-13 4-10 8-16 1-8-3-12-6-9-1-1h-25l-9-6-3-3-14-7-7-6-5-14-4-22-1-12-4-7v-2l-16 2h-9l-7-4-9-11-9-12-7-7-18-12-7-7 1-7 5-13 1-10-6 4-5 2-14 1-1-5 2-17 7-40 4-26 1-11-1-27 2-16 6-21 6-15 7-13 8-15 5-12 2-9 7-11 12-12 9-7 9-8 11-9 10-9 11-9 7-7 6-9 5-11 5-6 14-11 20-14 22-13 16-9 24-12 30-12 36-13 22-6 34-8 43-7z" fill="#F79B0C"/>
                            <path transform="translate(1484,626)" d="m0 0 9 1 7 3 10 5 20 6 11 6 10 9 6 7 5-1 4-8 4-9 2-6 4 1 7 6 13 22 13 26 13 32 7 21 9 30 9 38 7 39 4 32 2 27v52l-3 32-5 35-7 39-12 44-8 23-12 31-9 21-8 16-16 27-7 11-3 2 1-7 6-14 12-37 10-31 5-19 8-32 5-34 1-10v-13l-1-4v-19l4-23v-20l-3-12-8-18-6-8-5-6-2-1h-9l-10 3-5 5-11 10-5 3-4-1h-8l-16 8-8 7-2 1h-7l-8-3-13-13-8-11-12-14-30-30-5-8-2-9v-10l6-36 1-13-2-10-5-6-14-7-2-5 3-12 5-11 1-8-1-18 3-12 6-11 6-8 7-11-1-5-5-12-8-16-2-12 2-4 10-5 14-9 13-9z" fill="#F79B0C"/>
                            <path transform="translate(809,367)" d="m0 0m-1 1m-3 0 5 2-4 3-27 11-24 11-22 11-21 12-26 16-16 11-17 12-18 14-11 9-14 12-11 9-16 15-21 21-7 8-13 15-12 14-11 14-9 12-12 17-13 20-9 15-10 17-16 31-12 26-11 27-10 28-10 33-9 37-7 37-5 39-2 26-1 28v23l2 35 4 35 6 38 10 44 7 25 12 36 13 32 13 28 13 26 14 24 10 16 12 18 12 17 14 18 11 14 13 15 7 8 14 15 21 21 8 7 12 11 11 9 10 8 13 10 19 14 21 14 16 10 20 12 28 15 25 12 39 16 38 13 37 10 33 7 37 6 34 4 27 2h49l39-3 31-4 32-6 31-7 27-7 40-13 26-10 30-13 32-16 18-10 21-13 11-7 19-13 14-10 18-14 14-12 11-9 16-15 10-9 15-15 7-8 9-10 7-8 9-11 11-14 10-13 10-14 14-21 13-21 9-16 11-20 13-28 12-29 11-30 10-32 9-37 8-43 4-30 3-8 3-54v-14l-1-43h2l3 13v117l-5 33-2 22-4 21-5 15-3 17-3 15-4 14-15 45-5 12-7 15-5 13-12 25-14 28h-2l-2 6-17 28-9 14-14 19-13 16-7 8-9 10-15 16-5 5-10 12-10 8-12 11-9 7-11 9h-2v2l-13 10-16 12-9 6-11 8-7 4-13 9-11 7-15 9-29 14-17 7-9 4-12 5-30 10h-4v-2l14-7 20-9 12-6 11-6 6-3-6 1-8 4-12 5-25 10-18 7-27 9-23 7-40 10-46 10-35 6-41 5-16 3-21 1h-11l-21-3-2-1-19-2-17-3-37-7-25-4-21-5-13-4-22-6-27-9-16-8-17-6-10-3v-2l-5-2-7-3-11-3-14-6-8-3-11-5-21-10-16-10-23-15-14-10-9-7v-2l-5-2-10-8v-2l-5-2-16-13-10-8-9-8v-2l-4-2-7-7v-2l-4-2-11-12-13-17-1-4 4 1 19 19 8 7 7 6 7 8 11 10 3 2v2h2l-3-5-3-3v-2l-4-2-7-7-2-1v-2l-3-1v-2l-3-1-3-5-5-5v-2h-2l-3-4v-2l-4-2-3-3v-2l-3-1v-2l-3-1v-2h-2l-10-13-5-6v-2h-2v-3h-2l-6-8-7-9-5-5-9-12-8-14-2-5h-2l-6-8-8-14-16-26-15-30-13-29-5-11-5-14-4-10-6-17-8-24-6-21-4-19-6-26-3-18-4-27-3-29-1-17v-37l1-21 7-69 2-16 3-12 4-19 6-27 3-11 3-8 7-23 5-13 6-15 6-16 9-20 8-16 8-14 7-14 6-10 7-12 7-11 3-5h2l2-5 8-11 3-5h2l2-4 8-12h2l2-5 6-9h2l2-4 9-11 5-4 6-8 11-12 6-6h2l1-3h2l2-4 14-14h2l2-4 3-1 1-3 10-8 7-6h2v-2l8-7 5-4h2v-2l14-10 6-5h2v-2l26-18 10-7 14-8 16-9 7-5 11-6 14-8 13-5h2v-2l12-6 14-5 4-1v-2l10-4z" fill="#FEF9F1"/>
                            <path transform="translate(1383,434)" d="m0 0 6 1v2l5 1 5 2v2l7 1 9 6v2l5 2 10 7 11 9 11 8 5 3-1-1-9-7v-2l-3-1-4-5-3-3h4l13 10 11 9 13 11 11 10 8 7 9 9 6 5 4 5 5 4 7 8 8 8 9 11 11 13 9 12 12 15 13 19 11 17 15 25 12 22 3 9 7 14 9 22 5 12 1 4h-2l-3-5h-3l1 5-1 9-1 2-5-1-4-11-4-1-2 1-5-13-5-12-13-29-3-3-10-20-11-18-7-6h-3l-2 7-5 12-4 5-5-1-12-13-10-6-10-4-16-5-8-4-7-3-9-1-13 10-13 9-5 3-13 5h-4l-4-1-1-5-3-1 5-6 8-4 4-4 11-4 6-4v-8l-4-9-8-10-1-2v-7l3-8 6-9 8-16 2-3 7 1 16 10 10 8 11 8 12 9 16 8 5 1-1-3-2-1 1-8-9-11-7-8-17-17-7-8-20-20-8-7-15-13-11-9-16-12-13-11-4-5-10-7-8-9-6-5v-2l-5-1-4-4z" fill="#303132"/>
                            <path transform="translate(1399,458)" d="m0 0 10 4 8 5 10 8 12 10 9 6 9 8 11 9 12 11 10 9 20 20 7 8 12 12 8 9 7 9-1 5-1 3 3 1v3l-8-1-13-7-28-21-14-10-9-5h-5l-8 16-9 15-1 4v7l8 11 3 4 2 6v8l-9 6-13 5-4 2-15 3-4-10-4-14-6-9-8-10-10-10-4-8v-11l4-10 6 1 10 7 6 3h6l6-5 1-6-5-8-5-5-9-7-9-5-2-1v-7l-3-7-1-16 9-10 5-13 1-7-4-8-3-5z" fill="#F79B0C"/>
                            <path transform="translate(1383,434)" d="m0 0 6 1v2l5 1 5 2v2l7 1 9 6v2l5 2 10 7 11 9 11 8 5 3-1-1-9-7v-2l-3-1-4-5-3-3h4l13 10 11 9 13 11 11 10 8 7 9 9 6 5 4 5 5 4 7 8 8 8 9 11 11 13 9 12 12 15 13 19 11 17 15 25 12 22 3 9 7 14 9 22 5 12 1 4h-2l-3-5h-3l1 5-1 9-1 2-5-1-4-11-4-1-2 1-5-13-5-12-13-29-3-3-10-20-6-10-7-20-4-9-12-17-14-17-7-5-9-11-7-8-17-17-7-8-20-20-8-7-15-13-11-9-16-12-13-11-4-5-10-7-8-9-6-5v-2l-5-1-4-4z" fill="#161824"/>
                            <path transform="translate(1061,395)" d="m0 0 17 2 10 3 6 4 1 2v7l-6 4-2 5-5 1-5 2-7 1-5 5-3 1-2 5-3 1-1 4-9 6-8 4-7 7-9 3h-2v4l-2 2v3l6 1v3l-2 2-4 1h-14l-7-9-4-6-9-10-4-2h-8l-2 5-9 10-12 14-10 11-8 7-9 9-10 4-6-1v-10l5-13 3-5h-11l-8-2-1-4-6-2-1-1v-7l5-4 16-6 5-5 8-7 5-2h10l8 4 1 3 12-3 16-8 3-1h8l9 4 9 9 6 4 7 3 5-1 8-5 14-9 12-9 8-8 2-4v-5l-12-2h-31l-21 1 2-4 11-8 10-4 18-3z" fill="#171925"/>
                            <path transform="translate(1344,398)" d="m0 0 12 5 8 3v2l5 1 18 10 16 8 14 8 11 8 9 6 7 5 7 2v-5l4-1 15 9 13 11 8 7 27 27 7 8 9 11 8 15 5 9 10 14 7 9 6 8v2l4 2 7 8 9 13 14 22 6 11 8 11 18 30 8 18 6 10 8 18 8 19 6 20 4 10 7 26 4 12 1 5v8l-3 2-2-7-2-1-13-42-9-24-12-29-12-26-12-23-13-23-15-24-16-24-11-14-12-15-7-9-13-15-7-8-13-13-8-9-8-7-9-9-8-7-14-12-17-14-16-12-15-11-15-10-19-12-43-24z" fill="#FDF6EB"/>
                            <path transform="translate(470,1314)" d="m0 0h2l5 9 9 14 3 4 3 5v2h2l3 6 7 7 3 6 4 5 3 5 6 7 3 5v2h2v2l4 2 4 8 10 9 3 6 11 11v2l4 2 7 8 3 5 3 3v2l4 2 10 10 10 7 5 4 6 7 8 7 9 7 8 7 7 2 6 9 5 2 5 5 7 3 2 3 11 3v2l5 1 8 7 8 5v2l4 1v2l5 1 7 3v2l5 2 4 2v2l6 2 12 6v2l5 2 26 13 11 4 9 4 12 5 24 9 38 12 22 6 50 10 16 2 13 2 12 2 4 2-2 1h-15l-39-6-35-7-34-9-36-12-24-9-28-12-29-14-22-12-20-12-14-9-25-17-16-12-13-10-11-9-13-11-24-22-23-23-7-8-9-10-9-11-13-16-12-16-12-17-19-29-9-15z" fill="#191B26"/>
                            <path transform="translate(1325,474)" d="m0 0h10l16 4 10 4 10 7 7 7 5 10v10l-4 10-3 1-1 2-5-1v-2l-6 1-1-1v-16l-4-6-2-1h-7l-1 7 5 11v4l-10-2-9-6-8-14-1-4-6-2-5-11 1-7 3-3z" fill="#F79B0C"/>
                            <path transform="translate(798,785)" d="m0 0h11l16 6 10 5 15 9 11 11 3 2v10l-3 14-4 5-9-1-8-7-8-16-9-7-17-8-10-5-2-2v-12z" fill="#F79B0C"/>
                            <path transform="translate(1041,1717)" d="m0 0h7l1 182h-12l1-131 1-50z" fill="#2F3132"/>
                            <path transform="translate(1040,76)" d="m0 0h7l1 42v141l-9 1-1-1v-120l1-62z" fill="#303233"/>
                            <path transform="translate(1953,982)" d="m0 0 3 1-1 5-4 4h-178l-2-5v-3l129-1z" fill="#171925"/>
                            <path transform="translate(285,983)" d="m0 0h27l3 1-1 7-2 1h-179l-2-2-1-5 1-1z" fill="#191B26"/>
                            <path transform="translate(983,862)" d="m0 0 6 1 10 5 7 7 3 4 1 5v16l-5 10-7 11-1 1h-5l-3-3v-11l3-8-1-7-7-17-2-4v-9z" fill="#F79B0C"/>
                            <path transform="translate(927,442)" d="m0 0h10l6 3-1 3-2 2-1 6-14 10-11 10-6 3h-8l-11-5-1-1v-7l5-4 16-6 5-5 8-7z" fill="#161825"/>
                            <path transform="translate(892,830)" d="m0 0h7l11 3 7 5v16l-4 6h-9l-10-2-13-2-4-3v-6l6-10 7-6z" fill="#F79B0C"/>
                            <path transform="translate(1035,525)" d="m0 0h4l1 4-2 4 3 5-5 4-2 1v6l-7-1-3 1 1 4-4 1-6-1h-2l-1 6-5 1-11-4-3-2-1-3-2-1v-2l-4-1-3-8v-6l4-4 3-1 6 4 7 7 7 3h10l2-4 9-10z" fill="#161825"/>
                            <path transform="translate(1482,621)" d="m0 0 2 1-1 4-4 5-16 12-10 6-13 5h-4l-4-1-1-5-3-1 5-6 8-4 5-3 7-1 5-2 4-4h2l2-4 3-1 9 1 2 1v-2z" fill="#151724"/>
                            <path transform="translate(1048,1378)" d="m0 0h11l-2 2-16 3h-3l-2 4-5 5-2 3h-2l-1 4h-2l-1 3h-2v2l-5 5-2 4-10 10h-2l-2 5-3 1-2 4-4 5-3 9-3 1 1-8 7-18 10-14 9-9 1-2h2l1-3 14-11 6-3z" fill="#171925"/>
                            <path transform="translate(1145,1299)" d="m0 0h7l-2 2h-4l-1 5-8 8-2 5h-2l-2 6-2 3h-2l-1 4-6 11-7 9-8 9-9 6-5 5-10 4h-2v-2l8-4 4-4 5-3 12-16 8-14 10-19 6-9 6-4z" fill="#171925"/>
                            <path transform="translate(1210,420)" d="m0 0h18l16 8 4 6-1 6-6 4-9-1-13-4h-6l-1-1v-13z" fill="#F79B0C"/>
                            <path transform="translate(917,334)" d="m0 0h10l-1 3-7 3-39 9-28 8-42 14-2-2 5-5 16-6 7-2 10-3 21-7 38-10z" fill="#FCF0DF"/>
                            <path transform="translate(946,597)" d="m0 0 2 1-1 4-14 7-7 3-4 4-8 4-3 1-1 4h-2l-1 5-5 5-1 2h-2l-1 4h-2l-1 4-5 4h-2l-2 4-5 2v2l-4 4-2 4-5 3-5 2v-3l5-5 7-8 8-13 8-11 9-10 9-7 27-9z" fill="#171925"/>
                            <path transform="translate(1044,401)" d="m0 0h7l6 2h7v2l6 1 1 4-3 3-4-1-1-3-11 1-1 2 10 1v1h-39l-21 1 2-4 11-8 7-1 12 1 2-1z" fill="#2F3132"/>
                            <path transform="translate(1466,482)" d="m0 0 4 2 10 9 8 7 10 9 8 8 6 5 4 5 5 4 7 8 8 8 9 11 11 13 9 12 6 7v2l-4-2-8-10-7-9-7-7-7-9-12-13-3-3v-2h-2l7 8 4 5h-3l-3-3v-2h-2l-7-8-4-6h2l-4-5-2-1v2l-4-2-2-4h-2l-15-15-8-7-1-4-3-2 1 2-4-2-5-5 2-1-2-2z" fill="#2D2F31"/>
                            <path transform="translate(1644,1075)" d="m0 0h1v7l-2 6-2 9-7 28-3 13-5 10-3 10-4 14h-2l-1 5-7 14h-2l-1 5-4 5-5 10-2-1 5-11 7-18 6-15 11-28 10-30 8-29h2z" fill="#181A26"/>
                            <path transform="translate(1279,1136)" d="m0 0 1 2-7 13-9 11-8 7-6 8-1 2h-2l-2 4-8 10-6 7-5 6-7 3-2 5h-2v-7l9-13 16-17 4-2 2-4 21-21 8-11z" fill="#171925"/>
                            <path transform="translate(944,843)" d="m0 0h8l10 4 1 4-5 3-6 9-4 3-9 1-8-2-1-4 3-12 7-5z" fill="#F79B0C"/>
                            <path transform="translate(470,1314)" d="m0 0h2l5 9 9 14 3 4 3 5v2h2l3 6 7 7 3 6 4 5 3 5 6 7 3 5v2h2v2l4 2 4 8 10 9 3 6 11 11v2l4 2 7 8 3 5 3 3-1 3-13-13-7-8-9-10-9-11-13-16-12-16-12-17-19-29-9-15z" fill="#1A1C27"/>
                            <path transform="translate(848,671)" d="m0 0h10l-4 5-5 2v2l-7 3-5 10h-2l-2 4-3 1-2 5-5 4h-3l2-10 7-14 4-5 10-5z" fill="#161825"/>
                            <path transform="translate(1588,937)" d="m0 0h9l5 4 8 10 2 4v5l-8-4-1-5-12-1-7-2-7 1-4 3-5-1 6-8 7-4z" fill="#181A25"/>
                            <path transform="translate(943,446)" d="m0 0h2l1 3 9-1-2 2-7 3-10 11-8 10-8 7-7 8-1-2 3-5h-11l-8-2-1-4 6 2h8l11-8 9-8 8-6h2v-7z" fill="#453C2E"/>
                            <path transform="translate(1690,851)" d="m0 0 2 4 5 26 4 29 3 32 1 1 1 8 1 43-2 36-1 20-2 4h-1l1-25 1-14v-57l-3-38-6-44-4-20z" fill="#F6B553"/>
                            <path transform="translate(1036,1773)" d="m0 0h1v121l-3-1-1-2v-26l1-15v-60l1-13z" fill="#FFFCF7"/>
                            <path transform="translate(754,696)" d="m0 0h8l13 5 9 6v2l-6-1-6-5-2-1-1 2-4-2-12 1-11 5-8 6h-5l-8 3h-2v-2l14-8 8-6 8-4z" fill="#181A26"/>
                            <path transform="translate(1039,1718)" d="m0 0h8v24l-3 5-1 8-2 56h-1l-1-36z" fill="#151724"/>
                            <path transform="translate(755,496)" d="m0 0 1 2-4 8-9 9-11 9-12 11-6 5h-3v-4h2v-2l5-2v-2l4-2 2-5 3-3h2l1-3 5-2 1-4 5-2 1-3h2l2-4 5-5z" fill="#191B26"/>
                            <path transform="translate(1224,1243)" d="m0 0 1 3-3 10-4 9-4 8-9 7-6 5-7 2-8 4-9 2v-2l16-8 8-6 11-11 9-14 3-8z" fill="#181A26"/>
                            <path transform="translate(1482,621)" d="m0 0 2 1-1 4-4 5-16 12-2-1 2-3-1-2-6 1-2-2 2-4 6-5h2l2-4 3-1 9 1 2 1v-2z" fill="#161824"/>
                            <path transform="translate(1040,1832)" d="m0 0 2 2 1 8v23l1 11-1 2h2l2 18h2v3h-12v-2h2v-49z" fill="#161824"/>
                            <path transform="translate(836,1188)" d="m0 0 4 1 8 8 8 7 13 11 12 11 10 11 2 3v5h-2v-2h-2v-2l-4-2-6-9-7-4-7-9-2-1v-3h-3v-3h-3l-7-8-14-13z" fill="#1A1C26"/>
                            <path transform="translate(1035,525)" d="m0 0h4l1 4-2 4 3 5-5 4-2 1v6l-7-1h-4l-5-4h8l-1-4-3 1 1-4 7-8z" fill="#151724"/>
                            <path transform="translate(1953,982)" d="m0 0 3 1-1 3v-2l-10 2h-34l-139-1-1 2v-3l129-1z" fill="#303233"/>
                            <path transform="translate(952,578)" d="m0 0 8 1 9 6-4 4-10 4-5 1-4-2 2-11z" fill="#161824"/>
                            <path transform="translate(1159,433)" d="m0 0h5l1 4-7 8-11 8-8 10h-2l1-5 11-16 6-7z" fill="#171925"/>
                            <path transform="translate(1458,575)" d="m0 0 4 5 1 2-3 7h-2v4l-3 3 3 1v3l-1 3-4-1-4-6v-7l3-8 5-5z" fill="#181A26"/>
                            <path transform="translate(1545,957)" d="m0 0h8l-1 4-8 7-10 1-11 5-3-1 12-10z" fill="#181A26"/>
                            <path transform="translate(1401,540)" d="m0 0 5 2 11 4 7 9v9l-4 1-6-12v-2l-7-2-2-3-3-1z" fill="#171925"/>
                            <path transform="translate(1040,76)" d="m0 0h7v13l-2 6-2 4-1 20-2 1-1-43z" fill="#161824"/>
                            <path transform="translate(1344,1573)" d="m0 0h4v2l-28 14-31 13-8 1 3-2 15-6 6-3 17-8 7-4 7-3 5-2z" fill="#1C1E28"/>
                            <path transform="translate(1694,855)" d="m0 0 3 2 3 13 3 21-2 5-2-4-1-11h-2l-2-12-1-13z" fill="#FDF9F4"/>
                            <path transform="translate(883,831)" d="m0 0 3 2-6 10-6 5-2-1-2-7 1-5 3-2z" fill="#161824"/>
                            <path transform="translate(706,720)" d="m0 0h5l-3 2-5 3h-2l-1 3-5 3-6 7h-3v-6l7-6 10-5z" fill="#1A1C26"/>
                            <path transform="translate(1644,1075)" d="m0 0h1v7l-2 6-2 9-3 12-5 5 2-10 7-25h2z" fill="#1C1E28"/>
                            <path transform="translate(631,473)" d="m0 0 2 1-3 4h-2l-1 3-5 5-6 3-6 5-4 5-3 3-5 1 2-4 14-12 11-9z" fill="#20222A"/>
                            <path transform="translate(470,1314)" d="m0 0h2l5 9 9 14 3 4 3 5v2h2l1 7-4-5-12-18-9-15z" fill="#1C1E28"/>
                            <path transform="translate(739,830)" d="m0 0h2l-1 7-3 4-3 7-3 3h-3v-6l8-11z" fill="#191B26"/>
                            <path transform="translate(1705,1011)" d="m0 0h1l-1 19-1 20-2 4h-1l1-25 1-14z" fill="#F5D09B"/>
                            <path transform="translate(985,446)" d="m0 0 5 2 5 5 1 5-1 5-5-5-6-7z" fill="#2F3132"/>
                            <path transform="translate(1021,539)" d="m0 0 2 1 3-1 1 5-5 1-1 1 3 3h-7l-3-2v-3l-8-1-3-3 7 2h10z" fill="#303233"/>
                            <path transform="translate(1191,341)" d="m0 0h9l11 3 9 3 2 2-13-1-10-3v-2l-8-1z" fill="#FCF0DE"/>
                            <path transform="translate(1315,1587)" d="m0 0m-1 1 1 3-26 11-8 1 3-2 15-6 6-3z" fill="#1E2029"/>
                            <path transform="translate(1521,1441)" d="m0 0 2 1-3 5-18 18-3-1 6-7 6-5 4-5 5-4z" fill="#1C1E28"/>
                            <path transform="translate(451,1277)" d="m0 0 3 4 8 15 7 13-1 2-3-3-14-27z" fill="#1E2029"/>
                            <path transform="translate(1469,554)" d="m0 0 7 2v2l2 1-3 3-5 2-2-3-3-1z" fill="#151724"/>
                            <path transform="translate(1605,686)" d="m0 0 3 3 13 30 2 5-1 3-5-11-10-24z" fill="#303233"/>
                            <path transform="translate(792,959)" d="m0 0h7l4 5v2l-4 1-5-3-3-4z" fill="#151724"/>
                            <path transform="translate(622,1510)" d="m0 0 5 1 7 6 2 4-6-2-8-7z" fill="#F5EBE3"/>
                            <path transform="translate(718,530)" d="m0 0h5l-2 4-7 6h-3v-4h2v-2l5-2z" fill="#1B1D27"/>
                            <path transform="translate(656,839)" d="m0 0 5 1 10 7v3l-9-2v-4l-6-4z" fill="#1B1D27"/>
                            <path transform="translate(1466,482)" d="m0 0 4 2 5 4-2 4 2 3-4-2-5-5 2-1-2-2z" fill="#2B2D30"/>
                            <path transform="translate(1513,531)" d="m0 0 4 1 8 10 7 8h-3l-3-3v-2h-2l-7-8z" fill="#303233"/>
                            <path transform="translate(1040,244)" d="m0 0 2 4v3l4 2v5h-6z" fill="#151724"/>
                            <path transform="translate(991,954)" d="m0 0h5l3 3v6l-4-1-4-5z" fill="#151724"/>
                            <path transform="translate(1458,633)" d="m0 0h3v2h3l1 2 6-1-5 5-5 2 2-4-1-2-6 1-2-2 1-2z" fill="#303233"/>
                            <path transform="translate(1571,592)" d="m0 0 5 5 10 14 2 5-5-5-12-16z" fill="#303233"/>
                            <path transform="translate(1014,403)" d="m0 0 4 1-4 1v3l-5 5h-5l4-6z" fill="#1B1D27"/>
                            <path transform="translate(946,597)" d="m0 0 2 1-1 4-14 7h-6l3-2 10-4z" fill="#1E2029"/>
                            <path transform="translate(1026,569)" d="m0 0 1 3-4 6-3 3h-2v2h-2l1-4 6-8z" fill="#1A1C27"/>
                            <path transform="translate(1e3 966)" d="m0 0 4 1v2h3l1 4-4 1-4-2-2-5z" fill="#151724"/>
                            <path transform="translate(1637,1097)" d="m0 0 2 4v6l-2 4-4 3 2-10z" fill="#20222A"/>
                            <path transform="translate(631,473)" d="m0 0 2 1-3 4h-2l-1 3-5 5h-3l6-8z" fill="#1A1C27"/>
                            <path transform="translate(1460,1498)" d="m0 0h2l-1 3-10 8-3-1 5-6 3-2z" fill="#1D1F28"/>
                            <path transform="translate(1321,499)" d="m0 0 4 2 5 9-1 2-2-4-3-1v-2h-2z" fill="#151724"/>
                            <path transform="translate(1461,924)" d="m0 0 4 2 10 10-1 3-5-5v-2l-3-1v-2l-3-1v-2h-2z" fill="#1E2029"/>
                            <path transform="translate(1459,627)" d="m0 0m-2 1h2l-1 4-10 3h-5l2-2 11-4z" fill="#303233"/>
                            <path transform="translate(933,331)" d="m0 0h6l1 3-2 1h-9l-2-2z" fill="#FFFCF7"/>
                            <path transform="translate(451,1277)" d="m0 0 3 4 6 12-1 4-8-16z" fill="#21232A"/>
                            <path transform="translate(773,701)" d="m0 0 5 2 6 4v2l-6-1-5-6z" fill="#1E2029"/>
                            <path transform="translate(1445,1510)" d="m0 0h2l-1 3-11 8-3-1 3-1v-2h3v-2z" fill="#1E2029"/>
                            <path transform="translate(470,1314)" d="m0 0h2l5 9 1 1v5l-4-5-4-7z" fill="#1F2129"/>
                            <path transform="translate(836,1188)" d="m0 0 4 1 10 10-4-1-8-7z" fill="#1F2129"/>
                            <path transform="translate(1321,498)" d="m0 0h5l7 14-1 2-5-8-4-6z" fill="#303233"/>
                            <path transform="translate(1703,1040)" d="m0 0h1v10l-2 4h-1v-9z" fill="#F5D6AB"/>
                            <path transform="translate(927,334)" d="m0 0 10 1-1 2-13 2z" fill="#F5D6AB"/>
                            <path transform="translate(1401,1539)" d="m0 0h5l-1 3-7 4-3-1 3-1 1-3h2z" fill="#1D1F28"/>
                            <path transform="translate(1187,1285)" d="m0 0 2 1-5 5-9 2v-2z" fill="#1D1F28"/>
                            <path transform="translate(952,578)" d="m0 0 8 1-3 1v3h-3l-1-2-5 2 2-4z" fill="#2E3032"/>
                            <path transform="translate(1464,562)" d="m0 0 1 4-3 6h-2l1-7z" fill="#1C1E28"/>
                            <path transform="translate(1704,1026)" d="m0 0 1 4-1 10-2 1v-12z" fill="#F5CC91"/>
                            <path transform="translate(1543,564)" d="m0 0 7 6 4 5-1 2-5-5-5-6z" fill="#303233"/>
                            <path transform="translate(604,496)" d="m0 0 3 1-4 5-5 1 2-4z" fill="#1C1E27"/>
                            <path transform="translate(645,462)" d="m0 0 2 1-5 5-7 4 2-4z" fill="#1F2129"/>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-between lg:flex-row sm:flex-col">
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>From</span>
                            </div>
                            <div>
                                <input
                                    className="bg-pink p-2 px-4 rounded-xl text-black "
                                    placeholder="Your Location"
                                    value={departureLocation}
                                    onChange={(event) => {
                                        setDepartureLocation(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>To</span>
                            </div>
                            <div>
                                <input
                                    className="bg-pink p-2 px-4 rounded-xl text-black "
                                    placeholder="Your Destination"
                                    value={arrivalLocation}
                                    onChange={(event) => {
                                        setArrivalLocation(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>Date</span>
                            </div>
                            <div>
                                <input type="date" className="bg-pink p-2 px-4 rounded-xl text-black" value={selectedDate} onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                }}/>
                            </div>
                        </div>
                        <div className="p-2 bg-black rounded-xl w-3/4 flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>Passengers</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Total Passengers"
                                    value={passengers}
                                    className="bg-pink p-2 w-full px-4 rounded-xl text-black "
                                    onChange={(e) => {
                                        setPassengers(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            className="bg-black items-center text-white flex gap-2 rounded-xl hover:bg-pink hover:text-black transition border border-black px-5 py-8"
                            onClick={handleSubmit}
                        >
                            <span>Discover</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-2 rounded-xl bg-pink border border-black w-full flex flex-col">
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col items-center gap-3">
                        <span className="font-semibold text-h2 italic">DISCOVER FLIGHTS</span>
                    </div>
                    <div>
                        <svg version="1.1" viewBox="0 0 1776 1600" width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(0)" d="m0 0h1776v1600h-1776z" fill="#F7ECE4"/>
                            <path transform="translate(1091,463)" d="m0 0h17l13 4 13 9 10 9 6 10 7 18 2 8-7 16-7 9-9 11-19 19-8 7-52 52-3 5 1 9 8 34 7 31 13 57 11 48 9 42 13 47 11 50 4 21 3 18-3 7-11 12-7 8-8 7-7 8-8 5-5-2-6-8-8-13-14-25-13-23-9-15-16-28-14-24-9-16-8-13-10-18-16-27-11-19-14-23-9-8-4 1-30 30-8 7-15 14-7 7-8 7-13 13h-2l-1 3-8 7-10 10-11 9-7 7-8 7-13 11-2 3v11l7 24 14 53v12l-7 14-7 9-2 2-6-1-11-9-7-8-5-5-15-16-16-16-8-7-8-5h-12l-20 9-9-1-10-4-8-8-9-11-4-7-1-3v-7l4-8 8-14-1-8-6-9-11-12-17-17-6-5-7-8-20-20-4-8 1-4 10-5 19-5h10l20 4 40 11 15 5 10 3 1-3 8-7 8-8 7-8 10-10 7-8 8-8 7-8 10-11 9-11 10-11 7-8 13-14 14-16 8-7 11-12-5-5-9-6-30-18-19-11-17-10-21-12-20-12-23-13-13-8-84-48-19-11-9-7 2-4 13-12 8-7 12-10 5-7 8-4h14l47 9 43 9 46 11 46 10 150 34 9 1 6-1 7-6 7-8 61-61 8-7 16-12z" fill="#2B2D2F"/>
                            <path transform="translate(1160,395)" d="m0 0h11l14 5 8 5v2l5 2 5 4 7 8 8 11 5 10 3 12 1 13-4 14-9 16-9 10h-2l-2 4-7 8-8 16-4 5-4 8-4 1-3 6-4 1-2 5-5 6h-2l-2 4-12 16-7 7-7 8-6 6h-2l-2 4h-2l-2 4-4 2v2l-5 5-9 11-8 13-1 4-3 1-1 4v3l-4 5h-2l-2 6-1 13 2 15 5 19 2 13 4 16 5 22 13 53 5 28 2 5 4 1 2-4 6-6 7-2h11l3 3v1l-11 2-4 1-2 4-6 7-2 6 2 13 4 9 3 2h7l7-5h2l2-4 4-7 4-8v-12l6 5 2 6v7l-4 12-6 9-4 5-10 6-6 3h-2v15l7 39 4 25v13l-4 12-6 7-11 9-9 7-14 10-10 4-8-1-8-6-11-13-5-5v-2h-2v-2l-4-2v-2h-2l-4-4-8-7-9-15-6-11-8-11-8-15-6-7-4-8v-2l-2-1-7-11-12-18-8-14-13-19-6-9v-2h-2l-4-6-7-7-11-5-9 1-8 2-10 4-5 4h-2v2l-8 6-13 12-8 8-11 9-11 12-6 4-9 9-3 5v3l-4 3h-3v7l-8 5-6 1 3 23 4 23 3 23-2 13-4 9-3 5h-2l-1 3-12 9-8 1-10-3-9-7-6-4h-9l-9-3-13-9-14-9-11-6-10-6-11-4-4-3-12-4-14-10-10-10-6-8-4-11-1-5-1-19-2-5-9-10-5-9-1-5 2-3v-5l-11-13-9-13-7-8v-2h-2l-7-12-1-5 3-6h2l4 8 26 26 4 5 8 7 20 20 8 11 2 6-1 5-8 15-3 6v7l4 9 9 10 7 8 8 4 10 2 9-3 13-6h12l8 5 17 16 17 17 5 6 17 17 8 6 5-1 4-5 7-11 3-7v-12l-14-53-7-24v-11l6-7 11-9 15-14 11-9 15-15 8-7 16-16 8-7 10-10 8-7 15-14 22-22 4 1 8 7 6 9 10 17 8 14 12 20 14 24 9 16 8 13 11 20 10 17 12 21 13 22 15 27 11 19 9 13 5 2 9-6 9-10 8-7 11-12 5-7 1-6-3-16-9-45-9-37-10-36-9-42-13-57-11-48-8-36-8-33 1-7 9-10 52-52 8-7 15-15 8-10 5-7 7-16-4-14-7-16-7-9-11-9-10-6-11-3h-17l-12 5-17 13-16 15-57 57-6 7-6 3h-9l-113-26-103-23-38-9-70-14-11-2h-14l-8 4-7 9-13 11-12 11-4 3h-2l2-7 18-18 5-6h2v-2l15-10 9-3h12l35 3h15l12-2h20l5-5 6-8 9-7 4-2h19v1l-9 1-13 7-6 5-6 10v2l12 5 9 1h12l3 1 2-6 5-12 1-5 1 2 4 2 6 12 10 8 11 9 8 5 4 4 12 7 21 7 9 2 15 4 22 5 20 4 14 2 10 1h11l6-3 12-2 5-2 11-2 11-7 7-5h2v-2l9-7 10-9h2l2-4 4-4h2v-2h2v-2l8-7 12-12 11-8 7-4 6-3h2l2-4 6-9 5-5 6-10 8-8 14-11 12-8 7-2h4v-2z" fill="#FEFCF9"/>
                            <path transform="translate(569,533)" d="m0 0 5 1 9 7 22 12 22 13 16 9 24 14 25 14 13 8 23 13 13 8 21 12 51 30 13 8 9 6 6 5-6 7-9 10-3 3h-2l-2 4-10 10-9 11-11 11-9 11-10 11-9 11-8 8-7 8-8 8-7 8-10 10-7 8-12 12-8-1-10-4-47-13-20-4h-10l-19 5-8 1 4-3 6-2 3-3 8-1 6-3 9-1 20 4 36 8 12 2 9 2 7-1v-2h2l2-4 28-28h2v-2h2l2-4 12-12 7-10 8-10h2l2-4 9-10 14-16 4-5 3-5v-4h-9l-1-3h-3l-10-19-10-10v-2l-5-2-10-9-14-8-7-5-9-5-19-11-14-9-21-12-12-8-18-11-15-9-6-7-4-6-11-10-17-13-9-7-6-7-1-5z" fill="#FEFCF9"/>
                            <path transform="translate(945,621)" d="m0 0h15l14 5 9 6 6 5 10 13 5 12 1 14-2 10-8 16-9 10-8 6-14 7-4 1h-17l-11-4-9-6-8-7-8-10-5-10-2-12v-15l4-10 10-13 13-11 9-5z" fill="#FEFBF7"/>
                            <path transform="translate(1160,401)" d="m0 0h8l9 2 12 6 9 7 9 11 7 15 1 3 1 19-5 12-9 13-14 14-4 5-12 8-5 2 3-5-1-6-6-18-6-10-9-10-8-7-13-9-16-5-4-2-8-1 7-11 5-6 9-6 11-9 14-8z" fill="#1A1B1E"/>
                            <path transform="translate(951,638)" d="m0 0h9l10 4 9 8 7 11 3 8v10l-4 10-7 8-7 6-11 5-3 1h-10l-9-4-8-7-7-8-5-10v-15l3-8 9-10 9-6z" fill="#2B2D2F"/>
                            <path transform="translate(1159,415)" d="m0 0 11 2 4 9 9 11 6 8v6h-2l-2 7h-3l-2 10-7 8-14 2 2 2-1 3-8-10-8-8-14-10-5-4v-2l-1-3 3-9 1-5h2l-2-4 3-3 14-7h6v-2h7z" fill="#2B2D2F"/>
                            <path transform="translate(1050,977)" d="m0 0 4 4 6 11v2l3 1 2 5 2 1 3 8 4 6 1-4-5-9-2-5h-2l1-4 4 2 5 4 5 3v2l12 2v2l6 2 2 3 15-6 7-3 5-5h4l-1 5-11 12-7 8-8 7-7 8-8 5-5-2-6-8-8-13-14-25-8-14z" fill="#1A1B1E"/>
                            <path transform="translate(1107,446)" d="m0 0 20 6 18 13 11 11 7 11 8 22-1 5-2 3 1 2-11 5-1-8-7-19-5-9-8-9-10-7-8-5-11-3-17-1 3-2 6-2 4-2v-2l4-3 3-1-4-4z" fill="#FEFBF7"/>
                            <path transform="translate(1140,849)" d="m0 0h6l8 5 4 7v8l-7 14-4 5-9 6h-7l-5-4-4-12-1-10 4-8 7-8z" fill="#191A1D"/>
                            <path transform="translate(750,463)" d="m0 0h14l5 5 1 2v7l-4 11-3 6h-17l-10-2-10-5 2-5 6-9 10-7z" fill="#1A1B1E"/>
                            <path transform="translate(720,979)" d="m0 0 7 6 6 5 5 6 5 3 5 2 4 3v2l4 2v2l7 1h5l5 3 7 3v2l3 1v2h-2l1 6 3-1v-2l-2-2 2-2 1 2h5v-4h2v8h3l-1 5-7 9-2 2-6-1-11-9-7-8-5-5-15-16-16-16-7-6z" fill="#1B1C1F"/>
                            <path transform="translate(592,512)" d="m0 0h3l1 3h-3l-2 5-3 1-1 5h-2l-1 9-1 1 3 3v2l3-1 2 1v2l6 2 2 1 4 3 2 1v2h5l4 4h3v2l5 2 6 4 5 2 1 2 7 2 1 2h3v2h2l1 2 4 1v2l9 3 1 3 6 1 1 3 6 1v2l6 2 2 2 6 2 1 2 6 1 1 4 4 1 2 2 6 2v2l-6-1-15-9-26-15-16-9-19-11-24-14-20-11-12-9 2-4 13-12z" fill="#1C1E20"/>
                            <path transform="translate(608,822)" d="m0 0 3 1-1 2h-2l-2 4-5 3-5 5-2 3-3-1-4-6v-3h-2v2h-2l3 10 4 2v2l3 1 4 4 1 4 5 6 7 6 5 6 5 1 3 7 6 5 6 7 5 5 1 3-4-2-23-23-6-5-7-8-20-20-4-8 1-4 10-5 10-3z" fill="#1D1F21"/>
                            <path transform="translate(750,501)" d="m0 0h11l2 4v10l35 8 4 2-10-1-49-11-29-7v-1h7l7 1 11-4z" fill="#F7ECE4"/>
                            <path transform="translate(1140,849)" d="m0 0h6l2 2-7 1-1 3-5 1-1 3 2 4 4 4v8l-1 2-11 3 1 7h-2l1 4-2-1-4-12-1-10 4-8 7-8z" fill="#2B2D2F"/>
                            <path transform="translate(608,822)" d="m0 0 3 1-1 2h-2l-2 4-5 3-5 5-2 3-3-1-4-6v-3l-2-1 3-1v-2l10-3z" fill="#1A1B1E"/>
                            <path transform="translate(1136,553)" d="m0 0 1 3-20 20-8 7-10 10-3-1 3-5 3-1 2-6 3-3 1-2 7-2 4-5 2-2-1-3h6v-2h2v-2l4-1 1-3z" fill="#1D1E21"/>
                            <path transform="translate(650,579)" d="m0 0 5 1 7 3v2l6 1 1 3 6 1v2l6 2 2 2 6 2 1 2 6 1 1 4 4 1 2 2 6 2v2l-6-1-15-9-26-15-12-7z" fill="#1E2022"/>
                            <path transform="translate(1107,446)" d="m0 0 10 3 4 2-6 2-1 5-5 3 3 3-21-1 3-2 6-2 4-2v-2l4-3 3-1-4-4z" fill="#F7ECE4"/>
                            <path transform="translate(1e3 902)" d="m0 0h3l4 9 1 5h2v3h2v3h2l3 7 3 4v4h2l4 6v4l-3-1-13-23-10-17z" fill="#1F2023"/>
                            <path transform="translate(1128,415)" d="m0 0 2 1-5 5v3 3h-3v2l2 1-2 2-1 5-9 1v-5l3-2 2-7 10-8z" fill="#2A2C2E"/>
                            <path transform="translate(609,552)" d="m0 0 4 2 1 2h3v2l5 2 6 4 5 2 1 2 7 2 1 2h3v2h2l1 2 4 1v2l-6-1-38-22z" fill="#1D1E21"/>
                            <path transform="translate(1103,464)" d="m0 0 16 2 8 5 6 10-5-2-8-4v-2l-4-2-3-1-1-2-10-2z" fill="#1A1C1E"/>
                            <path transform="translate(653,971)" d="m0 0 12 3 5 6 2 2-1 1-7-1-6-3-4-4z" fill="#1C1D20"/>
                            <path transform="translate(1032,948)" d="m0 0 1 2 3 1 1 6 3 1 3 5 4 7 1 4-1 2-4-4-11-19z" fill="#1E1F22"/>
                            <path transform="translate(710,613)" d="m0 0 5 1 2 1v2l6 1v2l6 2 2 2 5 2 1 3 6 1 1 3-5-1-20-12-9-5z" fill="#1F2123"/>
                            <path transform="translate(972,701)" d="m0 0 2 1-9 6-10 5-7-1-11-6-1-2 5 2 6 2h10l12-5z" fill="#F7ECE4"/>
                            <path transform="translate(1155,857)" d="m0 0 3 4v8l-5 11-3-1 1-10 3-3 2-4z" fill="#2B2D2F"/>
                            <path transform="translate(988,872)" d="m0 0 4 5 1 4h2l4 8v2h2l2 4-1 3-7-9-7-12z" fill="#1D1F21"/>
                            <path transform="translate(1016,923)" d="m0 0 2 1v2l3 1 4 6v4h2l4 6v4l-3-1-12-21z" fill="#212225"/>
                            <path transform="translate(646,910)" d="m0 0 3 4 1 8-5 9-1-3 1-4h-2l1-5 2-2z" fill="#F7ECE4"/>
                            <path transform="translate(758,641)" d="m0 0 5 1 2 1v2l6 1v2l6 2 1 3-6-2-14-8z" fill="#1F2123"/>
                            <path transform="translate(634,569)" d="m0 0 7 1 1 2h3v2h2l1 2 4 1v2l-6-1-12-7z" fill="#1E1F22"/>
                            <path transform="translate(1213,452)" d="m0 0h2l1 12-2-1-2 4-2-1 1-5-1-4z" fill="#2B2D2F"/>
                            <path transform="translate(1157,513)" d="m0 0 4 4 7-1 1 3-11 5z" fill="#F7ECE4"/>
                            <path transform="translate(710,613)" d="m0 0 5 1 2 1v2l6 1v2l3 1v2l-5-2-11-6z" fill="#202224"/>
                            <path transform="translate(1063,625)" d="m0 0h2l-2 4-8 9h-2l2-6z" fill="#1E2022"/>
                            <path transform="translate(1076,612)" d="m0 0h2l-2 4-8 8h-2l2-5 4-1v-3l4-1z" fill="#1F2023"/>
                            <path transform="translate(992,882)" d="m0 0 4 4v2l3 1v2h2l2 4-1 3-7-9-3-5z" fill="#222426"/>
                            <path transform="translate(745,633)" d="m0 0 5 1 5 3 2 1v2l-6-1-6-4z" fill="#1E2022"/>
                            <path transform="translate(684,838)" d="m0 0 8 1 3 2h8l-1 3-8-1-10-4z" fill="#F7ECE4"/>
                            <path transform="translate(779,653)" d="m0 0 5 1 1 3 5 1 1 2-6-1-6-4z" fill="#1F2023"/>
                            <path transform="translate(762,487)" d="m0 0 3 1-2 6-14-1v-1l12-1z" fill="#2C2E30"/>
                            <path transform="translate(783,1021)" d="m0 0 3 4-2 4-3-1-1-4z" fill="#2C2E30"/>
                            <path transform="translate(650,579)" d="m0 0 5 1 7 3v3l-5-2-7-4z" fill="#1F2123"/>
                            <path transform="translate(1147,539)" d="m0 0h2l-2 5-5 4-1-2h2l1-6z" fill="#1D1F21"/>
                            <path transform="translate(1032,948)" d="m0 0 1 2 3 1 1 6-2 1-3-5z" fill="#1F2023"/>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-between lg:flex-row sm:flex-col">
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>From</span>
                            </div>
                            <div>
                                <input
                                    className="bg-pink p-2 px-4 rounded-xl text-black "
                                    placeholder="Your Location"
                                    value={departureLocation}
                                    onChange={(event) => {
                                        setDepartureLocation(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>To</span>
                            </div>
                            <div>
                                <input
                                    className="bg-pink p-2 px-4 rounded-xl text-black "
                                    placeholder="Your Destination"
                                    value={arrivalLocation}
                                    onChange={(event) => {
                                        setArrivalLocation(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-black rounded-xl flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>Date</span>
                            </div>
                            <div>
                                <input type="date" className="bg-pink p-2 px-4 rounded-xl text-black" value={selectedDate} onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                }}/>
                            </div>
                        </div>
                        <div className="p-2 bg-black rounded-xl w-3/4 flex flex-col gap-2">
                            <div className="bg-yellow p-2 rounded-xl flex items-center justify-center">
                                <span>Passengers</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Total Passengers"
                                    value={passengers}
                                    className="bg-pink p-2 w-full px-4 rounded-xl text-black "
                                    onChange={(e) => {
                                        setPassengers(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            className="bg-black items-center text-white flex gap-2 rounded-xl hover:bg-pink hover:text-black transition border border-black px-5 py-8"
                            onClick={handleSubmit}
                        >
                            <span>Discover</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Hero;