import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export const adminLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const admin = await prisma.admin.findUnique({where: {email}});

        if (!admin) {
            return res.status(401).json({error: "Invalid email"});
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.status(401).json({error: "Invalid password"});
        }

        // Create a token
        const token = jwt.sign({userId: admin.id, email: admin.email}, secretKey);

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: "Login failed"});
    }
}

