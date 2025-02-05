import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";


dotenv.config()
export const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const token = req.headers.authorisation?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Not authenticated" })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: number };
        req.userId = { id: decoded.id }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token is invalid" })
    }
}