import { FastifyInstance } from "fastify";
import { registerUser } from "../../MVC/controllers/userController/registerUser";
import { getUsers } from "@/MVC/controllers/userController/getUsers";
import { getSingleUser } from "@/MVC/controllers/userController/getSingleUser";
import { deleteUser } from "@/MVC/controllers/userController/deleteUser";
import { updateUser } from "@/MVC/controllers/userController/updateUser";
import { getPostsByUser } from "@/MVC/controllers/postController/getPostsByUser";


export function appUserRoutes(app: FastifyInstance) {
    app.get('/users', getUsers);

    app.get('/users/:id', getSingleUser);

    app.get("/users/:usuarioId/posts", getPostsByUser);

    app.post('/users/create', registerUser);

    app.delete('/users/delete/:id', deleteUser);

    app.patch('/users/update/:id', updateUser);
}