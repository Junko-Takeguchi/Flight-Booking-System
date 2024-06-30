import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FlightContextProvider from "./context/flight/FlightContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <FlightContextProvider>
        <App />
      </FlightContextProvider>
  </React.StrictMode>,
)
