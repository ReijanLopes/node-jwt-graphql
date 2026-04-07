import { Request } from "express";
import { JwtService, JwtPayload } from "../services/jwtService";

export type AuthContext = {
  userId: string | null;
  role: string | null;
};

const jwtService = new JwtService();

export function buildAuthContext(req: Request): AuthContext {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return { userId: null, role: null };
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload: JwtPayload = jwtService.verifyAccessToken(token);
    return { userId: payload.sub, role: payload.role };
  } catch {
    return { userId: null, role: null };
  }
}