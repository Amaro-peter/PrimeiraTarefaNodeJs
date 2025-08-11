import { User } from "@/generatedORMFiles/prisma";
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

    async execute({ nome, email, senha, foto }: RegisterUseCaseRequest): Promise<User | string | null> {

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            return 'Email já cadastrado';
        }

        const passwordHash = await hash(senha, 8);

        const user = await this.usersRepository.create({
            nome,
            email,
            senha: passwordHash,
            foto
        });

        if (!user) {
            return null;
        }

        return user;
    }
}