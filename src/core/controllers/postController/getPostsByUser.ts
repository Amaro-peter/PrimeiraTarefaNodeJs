import { PrismaPostRepository } from "@/core/repositories/prismaRepository/postPrismaRepository";
import { GetPostsByUserService } from "@/core/service/posts/getPostsByUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const getPostsByUserParamsSchema = z.object({
        usuarioId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID format")
    });

    const { usuarioId } = getPostsByUserParamsSchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostRepository();
        const getPostsByUserService = new GetPostsByUserService(prismaPostsRepository);

        const posts = await getPostsByUserService.execute(usuarioId);

        if (!posts || posts.length === 0) {
            return reply.status(404).send({
                message: "Nenhum post encontrado para o usuário especificado"
            });
        }

        return reply.status(200).send({
            message: "Posts do usuário recuperados com sucesso",
            posts
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send('Dados inválidos');
        }
        return reply.status(500).send('Erro interno do servidor');
    }
}