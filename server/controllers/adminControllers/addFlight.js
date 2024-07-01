import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const addFlight = async (req, res) => {
    const { flightNumber, name, departureLocation, arrivalLocation, date } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        // Check if the user is an admin
        const admin = await prisma.admin.findUnique({ where: { id: decoded.userId } });
        if (!admin) {
            return res.status(403).json({ error: "Access denied" });
        }

        const flight = await prisma.flight.create({
            data: {
                flightNumber,
                name,
                departureLocation,
                arrivalLocation,
                date: new Date(date),
            },
        });

        res.status(201).json(flight);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(500).json({ error: "Failed to add flight" });
    }
}