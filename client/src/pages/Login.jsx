import React, {useContext, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import userContext from "../context/user/userContext.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setUser} = useContext(userContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                email,
                password,
            });
            // console.log(response.data)
            if (response.status === 200) {
                const { token, id, email } = response.data;
                localStorage.setItem('userToken', token);
                setUser({
                    email,
                    id
                });
                navigate("/");
            } else {
                console.error('Login error:', response.data.error);
                alert(response.data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert("Login Failed");
        }
    };
    return (
        <div className="bg-pink-light px-8 py-5">
            <Navbar/>
            <div className="flex flex-col items-center justify-center h-screen bg-pink-light">
                <div className="bg-pink-light p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <div>
                        <div className="mb-4">
                            <label className="block text-black">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full p-2 border border-black rounded mt-1" placeholder="Enter your email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 border border-black rounded mt-1" placeholder="Enter your password" />
                        </div>
                        <button onClick={handleSubmit} className="w-full bg-yellow text-black py-2 rounded hover:bg-black hover:text-pink transition">Login</button>
                    </div>
                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-yellow-500 hover:underline">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
