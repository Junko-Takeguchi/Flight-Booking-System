import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const searchFlight = async (req, res) => {
    const { flightNumber, name, date, departureLocation, arrivalLocation } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        if (!decoded) {
            return res.status(401).json({ error: "User Login Required" });
        }

        const filters = {};

        if (flightNumber) {
            filters.flightNumber = flightNumber;
        }
        if (name) {
            filters.name = { contains: name, mode: 'insensitive' };
        }
        if (date) {
            const startDate = new Date(date);
            startDate.setUTCHours(0, 0, 0, 0);
            const endDate = new Date(startDate);
            endDate.setUTCDate(startDate.getUTCDate() + 1);
            filters.date = {
                gte: startDate,
                lt: endDate,
            };
        }
        if (departureLocation) {
            filters.departureLocation = { contains: departureLocation, mode: 'insensitive' };
        }
        if (arrivalLocation) {
            filters.arrivalLocation = { contains: arrivalLocation, mode: 'insensitive' };
        }

        const flights = await prisma.flight.findMany({
            where: filters,
        });

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: "Failed to search flights" });
    }
}