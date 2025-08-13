import { FastifyInstance } from "fastify";
import { registerUser } from "../../controllers/userController/registerUser";
import { getUsers } from "@/core/controllers/userController/getUsers";
import { getSingleUser } from "@/core/controllers/userController/getSingleUser";
import { deleteUser } from "@/core/controllers/userController/deleteUser";
import { updateUser } from "@/core/controllers/userController/updateUser";
import { getPostsByUser } from "@/core/controllers/postController/getPostsByUser";


export function appUserRoutes(app: FastifyInstance) {
    app.get('/users', getUsers);

    app.get('/users/:id', getSingleUser);

    app.get("/users/:usuarioId/posts", getPostsByUser);

    app.post('/users/create', registerUser);

    app.delete('/users/delete/:id', deleteUser);

    app.patch('/users/update/:id', updateUser);
}