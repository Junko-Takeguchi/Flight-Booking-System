import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const userRegister = async (req, res) => {
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

        res.status(201).json({ token, email });
    } catch (error) {
        res.status(400).json({ error: "User registration failed" });
    }
}