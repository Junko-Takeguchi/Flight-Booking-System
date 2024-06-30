import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// User Registration

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
app.post("/api/user/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                error: "User already exists"
            })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        // Create a token
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey);

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: "User registration failed" });
    }
});

// User Login
app.post("/api/user/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({ where: { email } });

        if (!admin) {
            return res.status(401).json({ error: "Invalid email" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ userId: admin.id, email: admin.email }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/api/admin/addFlight", async (req, res) => {
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
});

app.post("/api/admin/viewBookings", async (req, res) => {
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
});


app.post("/api/user/searchFlight", async (req, res) => {
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
});


app.post("/api/user/bookFlight", async (req, res) => {
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
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
