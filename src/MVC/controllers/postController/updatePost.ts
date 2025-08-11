import { Prisma } from "@/generatedORMFiles/prisma";
import { PrismaPostRepository } from "@/MVC/repositories/prismaRepository/postPrismaRepository";
import { UpdatePostService } from "@/MVC/service/posts/updatePostService";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const updatePostParamsSchema = z.object({
        id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID format")
    });

    const updatePostBodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional()
    });

    const { id } = updatePostParamsSchema.parse(request.params);
    const { titulo, conteudo } = updatePostBodySchema.parse(request.body);

    try {
        const prismaPostsRepository = new PrismaPostRepository();
        const updatePostService = new UpdatePostService(prismaPostsRepository);

        const updatedPost = await updatePostService.execute({ 
            id, 
            titulo, 
            conteudo 
        });

        if (!updatedPost) {
            return reply.status(404).send({ message: "Post não encontrada" });
        }

        return reply.status(200).send(updatedPost);
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Dados inválidos", 
                errors: error 
            });
        }


        return reply.status(500).send({ message: "Erro ao atualizar o post"});
    }
}