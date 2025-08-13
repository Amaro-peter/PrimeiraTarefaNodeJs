import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prismaRepository/userPrismaRepository";
import { DeleteUserService } from "../../service/user/deleteUserService";

interface GetUserParams {
    id: string;
}

export async function deleteUser(request: FastifyRequest<{ Params: GetUserParams }>, reply: FastifyReply) {
    
    try {
        const prismaUserRepository = new PrismaUsersRepository();

        const deleteUserService = new DeleteUserService(prismaUserRepository);

        const userId = request.params.id as string;

        await deleteUserService.execute(userId);

        return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
        

    } catch (error) {
        return reply.status(500).send('Erro ao deletar usuário');
    }
}