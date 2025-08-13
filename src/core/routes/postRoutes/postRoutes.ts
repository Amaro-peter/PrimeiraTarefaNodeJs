import { createPost } from "@/core/controllers/postController/createPost";
import { deletePost } from "@/core/controllers/postController/deletePost";
import { getAllPosts } from "@/core/controllers/postController/getAllPosts";
import { getSinglePost } from "@/core/controllers/postController/getSinglePost";
import { updatePost } from "@/core/controllers/postController/updatePost";
import { FastifyInstance } from "fastify";


export function appPostRoutes(app: FastifyInstance) {
    app.get("/posts", getAllPosts);

    app.get("/posts/:id", getSinglePost);

    app.post("/posts/create", createPost);

    app.patch("/posts/:id", updatePost);

    app.delete("/posts/:id", deletePost);
}