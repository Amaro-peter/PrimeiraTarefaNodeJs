import { PrismaPostRepository } from "@/core/repositories/prismaRepository/postPrismaRepository";
import { PrismaUsersRepository } from "@/core/repositories/prismaRepository/userPrismaRepository";
import { CreatePostService } from "@/core/service/posts/createPostService";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const createPostBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        usuarioId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID format")
    });

    const { titulo, conteudo, usuarioId } = createPostBodySchema.parse(request.body);

    try {
        const prismaPostsRepository = new PrismaPostRepository();
        const prismaUsersRepository = new PrismaUsersRepository();
        const createPostService = new CreatePostService(prismaPostsRepository, prismaUsersRepository);

        const post = await createPostService.execute({
            titulo,
            conteudo,
            usuarioId
        });

        if(!post) {
            return reply.status(400).send({
                message: "Usuário não encontrado"
            });
        }

        return reply.status(201).send({
            message: "Post criado com sucesso",
            post
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send('Dados inválidos');
        }
        return reply.status(500).send('Erro interno do servidor');
    }
}