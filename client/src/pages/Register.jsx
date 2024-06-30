import React, {useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('userToken', token);
                navigate("/");
            } else {
                console.error('Registration error:', response.data.error);
                alert(response.data.error); // Display error message to the user
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed'); // Display a generic error message
        }
    };
    return (
        <div className="bg-pink-light px-8 py-5">
            <Navbar/>
            <div className="flex flex-col items-center justify-center h-screen bg-pink-light">
                <div className="bg-pink-light p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                    <div>
                        <div className="mb-4">
                            <label className="block text-black">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full p-2 border border-black rounded mt-1" placeholder="Enter your email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 border border-black rounded mt-1" placeholder="Enter your password" />
                        </div>
                        <button onClick={handleSubmit} className="w-full bg-yellow text-black py-2 rounded hover:bg-black hover:text-pink transition">Sign Up</button>
                    </div>
                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-yellow-500 hover:underline">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
