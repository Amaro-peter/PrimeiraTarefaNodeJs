import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prismaRepository/userPrismaRepository";
import { User } from "@/generatedORMFiles/prisma";
import { GetSingleUserService } from "../../service/user/getSingleUserService";

interface GetUserParams {
    id: string;
}

export async function getSingleUser(request: FastifyRequest<{ Params: GetUserParams }>, reply: FastifyReply) {
    
    try {
        const prismaUserRepository = new PrismaUsersRepository();

        const getSingleUserService = new GetSingleUserService(prismaUserRepository);

        const userId = request.params.id as string;

        const user: User | null = await getSingleUserService.execute(userId);

        if (!user) {
            return reply.status(404).send('Usuário não encontrado');
        }

        const userData = { ...user, senha: undefined };

        return reply.status(200).send(userData);

    } catch (error) {
        return reply.status(404).send('Usuário não encontrado');
    }
}