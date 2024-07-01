import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const viewBookings = async (req, res) => {
    const { flightId, flightName, date } = req.body;
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

        const filters = {};

        if (flightId) {
            filters.flightId = flightId;
        }
        if (flightName) {
            filters.flight = { name: { contains: flightName, mode: 'insensitive' } };
        }
        if (date) {
            filters.flight = { date: new Date(date) };
        }

        const bookings = await prisma.booking.findMany({
            where: filters,
            include: {
                flight: true,
                user: true,
            },
        });

        res.status(200).json(bookings);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(500).json({ error: "Failed to view bookings" });
    }
};