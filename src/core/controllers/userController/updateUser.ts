import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prismaRepository/userPrismaRepository";
import { UpdateUserService } from "../../service/user/updateUserService";
import z from "zod";

interface GetUserParams {
    id: string;
}

export async function updateUser(request: FastifyRequest<{ Params: GetUserParams }>, reply: FastifyReply) {

    const updateBodySchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
        foto: z.string().optional()
    });
    
    try {
        const validatedData = updateBodySchema.parse(request.body);

        const filteredData = Object.fromEntries(
            Object.entries(validatedData).filter(([_, value]) => value !== undefined)
        );

        const prismaUserRepository = new PrismaUsersRepository();

        const updateUserService = new UpdateUserService(prismaUserRepository);

        const userId = request.params.id as string;

        const result = await updateUserService.execute(userId, filteredData);

        if(typeof result === 'string') {
            return reply.status(400).send({
                message: result
            });
        }

        if (!result) {
            return reply.status(404).send({
                message: "Usuário não encontrado ou nenhum dado para atualizar"
            });
        }

        return reply.status(200).send(result);
        

    } catch (error) {

        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                message: "Dados inválidos",
                errors: error
            });
        }

        return reply.status(500).send('Erro ao atualizar usuário');
    }
}