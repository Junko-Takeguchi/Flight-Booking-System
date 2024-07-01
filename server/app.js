import express from "express";
import cors from "cors";
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", adminRoutes)
app.use("/api", userRoutes)

app.get("/api/getAllFlights", async (req,res) => {
    try {
        const flights = await prisma.flight.findMany({
            include: {
                bookings: true
            }
        });
        if (flights) {
            return res.status(200).json(flights);
        }
        return res.status(400).json({
            error: "No flights found"
        })
    } catch (e) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
