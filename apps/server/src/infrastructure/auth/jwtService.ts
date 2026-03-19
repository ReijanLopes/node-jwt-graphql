import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export enum UserRole {
  MASTER = "MASTER", // Nível 5
  ADMIN = "ADMIN", // Nível 4
  MANAGER = "MANAGER", // Nível 3
  SUPERVISOR = "SUPERVISOR", // Nível 2
  EMPLOYEE = "EMPLOYEE", // Nível 1
}

export type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole
};

export class JwtService {
  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return null;
    }
  }
}