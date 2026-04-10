import { AuthContext } from "../middlewares/authMiddleware";
import { UserRole } from "../../role/entities/role";

const ROLE_LEVEL: Record<string, number> = {
  [UserRole.MASTER]: 5,
  [UserRole.ADMIN]: 4,
  [UserRole.MANAGER]: 3,
  [UserRole.SUPERVISOR]: 2,
  [UserRole.EMPLOYEE]: 1,
};

/**
 * Garante que o usuário está autenticado.
 * Lança erro se não houver userId no contexto.
 */
export function requireAuth(ctx: AuthContext): asserts ctx is AuthContext & { userId: string; role: string } {
  if (!ctx.userId) {
    throw new Error("Unauthenticated. Please log in.");
  }
}

/**
 * Garante que o usuário tem o role mínimo exigido.
 * Exemplo: requireRole(ctx, UserRole.MANAGER) — bloqueia EMPLOYEE e SUPERVISOR.
 */
export function requireRole(ctx: AuthContext, minimumRole: UserRole): void {
  requireAuth(ctx);

  const userLevel  = ROLE_LEVEL[ctx.role!] ?? 0;
  const neededLevel = ROLE_LEVEL[minimumRole] ?? 0;

  if (userLevel < neededLevel) {
    throw new Error(
      `Forbidden. Required role: ${minimumRole}. Your role: ${ctx.role}.`
    );
  }
}