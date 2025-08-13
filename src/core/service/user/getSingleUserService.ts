import { User } from "@/generatedORMFiles/prisma";
import { UsersInterfaceRepository } from "@/core/repositories/interfaceRepository/userInterfaceRepository";

export class GetSingleUserService {
    constructor(private usersRepository: UsersInterfaceRepository) {

    }

    async execute(userId: string): Promise<User | null> {
        const user = await this.usersRepository.findById(userId);
        return user;
    }
}