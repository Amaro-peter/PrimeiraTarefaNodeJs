import { PrismaPostRepository } from "@/core/repositories/prismaRepository/postPrismaRepository";
import { GetAllPostsService } from "@/core/service/posts/getAllPostsService";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostsRepository = new PrismaPostRepository();
        const getAllPostsService = new GetAllPostsService(prismaPostsRepository);

        const posts = await getAllPostsService.execute();

        if(!posts) {
            return reply.status(404).send({ message: "No posts found" });
        }

        return reply.status(200).send({
            message: "Posts recuperados com sucesso",
            posts
        });
    } catch (error) {
        return reply.status(500).send({
            message: "An error occurred while retrieving posts",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}