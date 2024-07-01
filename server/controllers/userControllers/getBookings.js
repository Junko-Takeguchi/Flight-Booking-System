import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const getBookings = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: { flight: true },
        });

        res.status(200).json(bookings);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(500).json({ error: "Failed to get bookings" });
    }
}