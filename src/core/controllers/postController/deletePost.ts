import { PrismaPostRepository } from "@/core/repositories/prismaRepository/postPrismaRepository";
import { DeletePostService } from "@/core/service/posts/deletePostService";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function deletePost(request: FastifyRequest, reply:FastifyReply) {
    const deletePostParamsSchema = z.object({
        id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID format")
    });

    const { id } = deletePostParamsSchema.parse(request.params);

    try{
        const prismaPostsRepository = new PrismaPostRepository();
        const deletePostService = new DeletePostService(prismaPostsRepository);

        const deletionResult = await deletePostService.execute(id);

        if(deletionResult === null) {
            return reply.status(404).send({ message: "Post não encontrado" });
        }

        if(deletionResult === false) {
            return reply.status(500).send({ message: "Falha ao deletar postagem" });
        }

        return reply.status(200).send({ message: "Postagem deletada com sucesso" });
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Parâmetros inválidos", errors: error });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}