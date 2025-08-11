import { PrismaPostRepository } from "@/MVC/repositories/prismaRepository/postPrismaRepository";
import { GetSinglePostService } from "@/MVC/service/posts/getSinglePostService";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import z from "zod";


export async function getSinglePost(request: FastifyRequest, reply: FastifyReply) {
    const getSinglePostParamSchema = z.object({
        id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID format")
    });

    const { id } = getSinglePostParamSchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostRepository();
        const getSinglePostService = new GetSinglePostService(prismaPostsRepository);

        const post = await getSinglePostService.execute(id);

        if(!post) {
            return reply.status(404).send({ message: "Post não encontrado" });
        }

        return reply.status(200).send({
            message: "Post recuperado com sucesso",
            post
        });
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({
                message: "Invalid request parameters",
                errors: error
            });
        }

        return reply.status(500).send({
            message: "An error occurred while retrieving the post",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}