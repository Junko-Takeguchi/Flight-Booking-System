﻿# Flight-Booking-System

- The fullstack app is deployed on - https://flight-booking-system-frontend-ashen.vercel.app
- The NodeJs Backend is deployed on - https://flight-booking-system-bjgm.onrender.com

## Steps to Test the Backend Server
- You can import the backend server postman collection by importing the `postman_collections.json` file in the server directory
- Or you can test by forking the postman collection url - https://www.postman.com/material-pilot-22276634/workspace/flight-bookings-server/overview 

## Steps to Setup the Server

1. **Clone the Project**
    ```sh
    git clone https://github.com/Junko-Takeguchi/Flight-Booking-System.git
    ```

2. **Navigate to the Server Directory**
    ```sh
    cd server
    ```

3. **Install Dependencies**
    ```sh
    npm install
    ```

4. **Create a `.env` File**
    - Add the following lines to your `.env` file:
        ```env
        DATABASE_URL="<your mongo db url>"
        JWT_SECRET="<your jwt secret>"
        ```

5. **Start the Development Server**
    ```sh
    npm run dev
    ```

6. **Access the Server**
    - The server will run on `http://localhost:3000`
