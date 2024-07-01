import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FlightContextProvider from "./context/flight/FlightContextProvider.jsx";
import UserContextProvider from "./context/user/UserContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <FlightContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
      </FlightContextProvider>
  </React.StrictMode>,
)
