import { UsersInterfaceRepository } from "@/MVC/repositories/interfaceRepository/userInterfaceRepository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    senha: string
    foto: string;
}

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersInterfaceRepository) {

    }

    async execute({ nome, email, senha, foto }: RegisterUseCaseRequest) {

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error();
        }

        const passwordHash = await hash(senha, 8);

        await this.usersRepository.create({
            nome,
            email,
            senha: passwordHash,
            foto
        });
    }
}