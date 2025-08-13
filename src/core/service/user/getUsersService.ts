import { User } from "@/generatedORMFiles/prisma";
import { UsersInterfaceRepository } from "@/core/repositories/interfaceRepository/userInterfaceRepository";

export class GetUsersService {
    constructor(private usersRepository: UsersInterfaceRepository) {

    }

    async execute(): Promise<User[]> {
        const user = await this.usersRepository.findMany();
        return user;
    }
}