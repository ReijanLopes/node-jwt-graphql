import { LoginUseCase } from "../../../domain/auth/usecases/loginUseCase";
import { RegisterUseCase } from "../../../domain/auth/usecases/registerUseCase";
import { RefreshTokenUseCase } from "../../../domain/auth/usecases/refreshTokenUseCase";
import { LogoutUseCase } from "../../../domain/auth/usecases/logoutUseCase";
import { UserRole } from "../../../domain/role/entities/role";

// Injeção manual — substitua por seu container de DI
import { PrismaUserRepository } from "@infra/database/prisma/repositories/prismaUserRepository";
import { PrismaAuthRepository } from "@infra/database/prisma/repositories/PrismaAuthRepository";

import { BcryptHashService } from "../../../domain/auth/services/hashService";
import { JwtService } from "../../../domain/auth/services/jwtService";


const userRepo = new PrismaUserRepository();
const authRepo = new PrismaAuthRepository();
const hashService = new BcryptHashService();
const jwtService = new JwtService();

export const authResolvers = {
  Mutation: {
    login: async (_: unknown, { input }: { input: { email: string; password: string } }) => {
      const usecase = new LoginUseCase(userRepo, authRepo, hashService, jwtService);
      return usecase.execute(input);
    },

    register: async (_: unknown, { input }: { input: any }) => {
      const usecase = new RegisterUseCase(userRepo, authRepo, hashService, jwtService);
      return usecase.execute({ ...input, role: UserRole.EMPLOYEE });
    },

    refreshToken: async (_: unknown, { token }: { token: string }) => {
      const usecase = new RefreshTokenUseCase(authRepo, jwtService);
      return usecase.execute(token);
    },

    logout: async (_: unknown, { refreshToken }: { refreshToken: string }) => {
      const usecase = new LogoutUseCase(authRepo);
      await usecase.execute(refreshToken);
      return true;
    },
  },
};