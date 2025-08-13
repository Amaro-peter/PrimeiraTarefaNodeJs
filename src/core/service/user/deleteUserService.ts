import { UsersInterfaceRepository } from "@/core/repositories/interfaceRepository/userInterfaceRepository";

export class DeleteUserService {
    constructor(private usersRepository: UsersInterfaceRepository) {

    }

    async execute(userId: string): Promise<void> {
        await this.usersRepository.deleteUser(userId);
    }
}