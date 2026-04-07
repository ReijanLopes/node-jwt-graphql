import { AuthRepository } from "../repositories/authRepository";
import { JwtService, TokenPair } from "../services/jwtService";
import { RefreshToken } from "../entities/refreshToken";

export class RefreshTokenUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string): Promise<TokenPair> {
    const stored = await this.authRepo.findRefreshToken(token);
    if (!stored || stored.isExpired()) {
      throw new Error("Invalid or expired refresh token.");
    }

    // Verifica assinatura JWT também
    const payload = this.jwtService.verifyRefreshToken(token);

    // Rotação de token: revoga o antigo, emite novo par
    await this.authRepo.revokeRefreshToken(token);

    const tokens = this.jwtService.generateTokenPair({
      sub: payload.sub,
      role: payload.role,
    });

    const newRefreshToken = RefreshToken.create({
      userId: payload.sub,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.authRepo.saveRefreshToken(newRefreshToken);

    return tokens;
  }
}