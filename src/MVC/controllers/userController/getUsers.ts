import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prismaRepository/userPrismaRepository";
import { GetUsersService } from "../../service/user/getUsersService";
import { User } from "@/generatedORMFiles/prisma";

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    
    try {
        const prismaUserRepository = new PrismaUsersRepository();

        const getUserService = new GetUsersService(prismaUserRepository);

        const users: User[] = await getUserService.execute();
        
        const userData = users.map(({senha, ...user}) => user);
        
        return reply.status(200).send(userData);
    } catch (error) {
        return reply.status(404).send('Usuário não encontrado');
    }
}