import { createPost } from "@/MVC/controllers/postController/createPost";
import { deletePost } from "@/MVC/controllers/postController/deletePost";
import { getAllPosts } from "@/MVC/controllers/postController/getAllPosts";
import { getSinglePost } from "@/MVC/controllers/postController/getSinglePost";
import { updatePost } from "@/MVC/controllers/postController/updatePost";
import { FastifyInstance } from "fastify";


export function appPostRoutes(app: FastifyInstance) {
    app.get("/posts", getAllPosts);

    app.get("/posts/:id", getSinglePost);

    app.post("/posts/create", createPost);

    app.patch("/posts/:id", updatePost);

    app.delete("/posts/:id", deletePost);
}