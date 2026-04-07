import { prisma } from "../client";
import { User } from "../../../../domain/user/entities/user";
import { UserRepository } from "../../../../domain/user/repositories/userRepository";

export class PrismaUserRepository implements UserRepository {

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: { id },
      include: { media: true, role: true },
    });

    if (!record) return null;
    return this.toEntity(record);
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: { email },
      include: { media: true, role: true },
    });

    if (!record) return null;
    return this.toEntity(record);
  }

  async save(user: User): Promise<User> {
    const record = await prisma.user.upsert({
      where: { id: user.getId },
      create: {
        id:       user.getId,
        name:     user.getName,
        email:    user.getEmail,
        phone:    user.getPhone,
        taxId:    user.getTaxId,
        password: user.getPassword,
        isActive: user.getIsActive,
        roleId:   user.getRole.getId,
        mediaId:  user.getMedia?.getId ?? null,
      },
      update: {
        name:     user.getName,
        email:    user.getEmail,
        phone:    user.getPhone,
        taxId:    user.getTaxId,
        password: user.getPassword,
        isActive: user.getIsActive,
        roleId:   user.getRole.getId,
        mediaId:  user.getMedia?.getId ?? null,
      },
      include: { media: true, role: true },
    });

    return this.toEntity(record);
  }

  private toEntity(record: any): User {
    return User.create({
      id:        record.id,
      name:      record.name,
      email:     record.email,
      phone:     record.phone,
      taxId:     record.taxId,
      password:  record.password,
      isActive:  record.isActive,
      role:      record.role,
      media:     record.media ?? undefined,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}