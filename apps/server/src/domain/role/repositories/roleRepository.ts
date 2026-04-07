import { Role } from "../entities/role";

export interface RoleRepository {
  findByName(name: string): Promise<Role | null>;
  deleteById(id: string): Promise<void>;
  update(name: string, level: number): Promise<Role>;
  roles(): Promise<Role[]>;
  save(role: Role): Promise<Role>;
}
