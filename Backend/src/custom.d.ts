// src/types/custom.d.ts
declare namespace Express {
    export interface Request {
        userId?: { id: number };
    }
}