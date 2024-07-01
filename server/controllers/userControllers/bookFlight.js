import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const bookFlight = async (req, res) => {
    const { flightId, seats } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const flight = await prisma.flight.findUnique({
            where: { id: flightId },
            include: { bookings: true },
        });

        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        if (flight.bookings.length + seats > 60) {
            return res.status(400).json({ error: "No seats available" });
        }

        const booking = await prisma.booking.create({
            data: {
                userId,
                flightId,
            },
        });

        res.status(201).json(booking);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(500).json({ error: "Failed to book flight" });
    }
}