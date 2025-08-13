import { Prisma, User } from "@/generatedORMFiles/prisma";
import { prisma } from "@/ORMLib/prisma";
import { UsersInterfaceRepository } from "../interfaceRepository/userInterfaceRepository";

export class PrismaUsersRepository implements UsersInterfaceRepository {
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        try {
            const user = await prisma.user.create({
                data
            });

            return user;
        } catch (error) {
            return null;
        }
    }

    async findMany() {
        const users = await prisma.user.findMany();
        return users;
    }

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    }

    async deleteUser(userId: string) {
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
    }

    async updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...data
            }
        });

        return user;
    }
}