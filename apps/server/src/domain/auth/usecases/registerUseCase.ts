import { User } from "../../user/entities/user";

import { IJwtService, TokenPair } from "../services/jwtService";
import { AuthRepository } from "../repositories/authRepository";
import { RefreshToken } from "../entities/refreshToken";
import { Role } from "../../role/entities/role";
import { HashService } from "../services/hashService";
import { UserRepository } from "@domain/user/repositories/userRepository";

type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  taxId: string;
  role: Role;
};

export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly hashService: HashService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(input: RegisterInput): Promise<TokenPair> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("Email already in use.");
    }

    const hashedPassword = await this.hashService.hash(input.password);

    const user = User.create({
      ...input,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    const tokens = this.jwtService.generateTokenPair({
      sub: user.getId,
      role: user.getRole.getName,
    });

    const refreshToken = RefreshToken.create({
      userId: user.getId,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.authRepo.saveRefreshToken(refreshToken);

    return tokens;
  }
}