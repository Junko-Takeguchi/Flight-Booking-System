import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const userLogin = async (req, res) => {
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

        res.status(200).json({ token, email:user.email, id:user.id });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}
