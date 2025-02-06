import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";


dotenv.config()
export const authenticatedUser = async (req: Request, res: any, next: NextFunction): Promise<void> => {
 
    //@ts-ignore
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Not authenticated" })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: number };
        console.log(decoded)
        // @ts-ignore
        req.userId = { id: decoded.userId }
        console.log(req.userId.id)  // Log user ID to console for debugging purposes.
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token is invalid" })
    }
}