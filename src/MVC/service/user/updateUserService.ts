import { User } from "@/generatedORMFiles/prisma";
import { UsersInterfaceRepository } from "@/MVC/repositories/interfaceRepository/userInterfaceRepository";
import { hash } from "bcryptjs";

interface UpdateUserData {
    nome?: string;
    email?: string;
    senha?: string;
    foto?: string
}

export class UpdateUserService {
    constructor(private usersRepository: UsersInterfaceRepository) {

    }

    async execute(userId: string, data: UpdateUserData): Promise<User | null> {
        const existingUser = await this.usersRepository.findById(userId);

        if(!existingUser) {
            return null;
        }

        const updateData = Object.entries(data).reduce((acc, [key, value]) => {
            if(value !== undefined) {
                acc[key] = value;
            }
            
            return acc;
        }, {} as Record<string, any>);

        if(Object.keys(updateData).length === 0) {
            return null
        }

        if(updateData.senha) {
            updateData.senha = await hash(updateData.senha, 8);
        }

        const user =  await this.usersRepository.updateUser(userId, updateData);
        return user;
    }
}