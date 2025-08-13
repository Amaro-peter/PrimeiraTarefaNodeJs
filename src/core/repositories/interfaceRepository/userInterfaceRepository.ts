import { Prisma, User } from "@/generatedORMFiles/prisma";

export interface UsersInterfaceRepository {
    create(data: Prisma.UserCreateInput): Promise<User | null>;

    findByEmail(email: string): Promise<User | null> 

    findMany(): Promise<User[]>

    findById(userId: string): Promise<User | null>

    deleteUser(userId: string): Promise<void>

    updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User>
}