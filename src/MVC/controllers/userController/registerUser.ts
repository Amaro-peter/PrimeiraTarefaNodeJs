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
        await registerUseCase.execute({
            nome,
            email,
            senha,
            foto
        });
    } catch (error) {
        return reply.status(409).send('Email já cadastrado');
    }

    return reply.status(201).send('Usuário criado com sucesso');
}