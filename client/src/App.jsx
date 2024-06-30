import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {useContext, useEffect} from "react";
import flightContext from "./context/flight/flightContext.js";
import axios from "axios";
import BrowseFlights from "./pages/BrowseFlights.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    const {setFlights} = useContext(flightContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllFlights`)
            .then(res => res.data)
            .then(data => {
                // console.log(data);
                setFlights(data);
            }).catch(e => console.log(e));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/flights" element={<BrowseFlights/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
