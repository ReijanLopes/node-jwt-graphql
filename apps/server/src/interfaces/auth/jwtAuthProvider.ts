// src/infrastructure/auth/JwtAuthService.ts
import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  email: string;
}

export class JwtAuthService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "fallback_secret";
  }

  verify(token: string): AuthPayload {
    try {
      const cleanToken = token.replace("Bearer ", "");
      return jwt.verify(cleanToken, this.secret) as AuthPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  // O Pleno já deixa pronto o método de criação para o caso de login
  generate(payload: AuthPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1d" });
  }
}