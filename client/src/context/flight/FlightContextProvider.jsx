import React, {useState} from "react";
import flightContext from "./flightContext.js";

const FlightContextProvider = ({children}) => {
    const [flights, setFlights] = useState(null);
    return (
        <flightContext.Provider value={{flights, setFlights}}>
            {children}
        </flightContext.Provider>
    )
}

export default FlightContextProvider;



