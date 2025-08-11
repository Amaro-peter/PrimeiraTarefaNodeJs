import { PrismaUsersRepository } from "@/MVC/repositories/prismaRepository/userPrismaRepository";
import { RegisterUseCase } from "@/MVC/service/user/registerUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        foto: z.string()
    });

    const { nome, email, senha, foto } = registerBodySchema.parse(request.body);

    try {

        const prismaUsersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(prismaUsersRepository);
        const result = await registerUseCase.execute({
            nome,
            email,
            senha,
            foto
        });

        if (typeof result === 'string') {
            return reply.status(409).send(result);
        }

        if (!result) {
            return reply.status(500).send('Erro ao criar usuário');
        }

        return reply.status(201).send({
            id: result.id,
            nome: result.nome,
            email: result.email,
            foto: result.foto
        });

    } catch (error) {
        return reply.status(409).send('Email já cadastrado');
    }
}