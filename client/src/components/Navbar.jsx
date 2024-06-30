import React from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-3">
                <h1 className="text-2xl font-semibold">Tripper</h1>
            </div>
            <div className="flex gap-2 text-b2">
                <div className="flex gap-2 items-center">
                    <button className="px-4 py-2 transition hover:underline hover:decoration-yellow hover:underline-offset-8">
                        <span>Home</span>
                    </button>
                    <button className="px-4 py-2 transition hover:underline hover:decoration-yellow hover:underline-offset-8">
                        <span>My Bookings</span>
                    </button>
                    <button className="px-4 py-2 transition hover:underline hover:decoration-yellow hover:underline-offset-8">
                        <span>All Flights</span>
                    </button>
                    <div className="flex gap-1">
                        <input type="text" className="bg-pink px-4 py-3 rounded-xl border-black" placeholder="Search Flight Name"/>
                        <button className="bg-yellow px-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button className="flex gap-2 px-4 py-2 hover:bg-pink rounded-xl border border-black transition" onClick={() => navigate("/login")}>
                    <div>
                        Login
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </button>
                <button className="flex gap-2 px-4 py-2 hover:bg-pink rounded-xl border border-black transition" onClick={() => navigate("/register")}>
                    <div>
                        Sign Up
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Navbar;