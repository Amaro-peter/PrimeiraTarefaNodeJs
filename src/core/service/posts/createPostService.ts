import { Post } from "@/generatedORMFiles/prisma";
import { PostsInterfaceRepository } from "@/core/repositories/interfaceRepository/postsInterfaceRepository";
import { UsersInterfaceRepository } from "@/core/repositories/interfaceRepository/userInterfaceRepository";


interface CreatePostServiceRequest {
    titulo: string;
    conteudo: string;
    usuarioId: string;
}

export class CreatePostService {
    constructor(
        private postsRepository: PostsInterfaceRepository,
        private usersRepository: UsersInterfaceRepository
    ) {}

    async execute({ titulo, conteudo, usuarioId }: CreatePostServiceRequest): Promise<Post | null> {
        const user = await this.usersRepository.findById(usuarioId);

        if(!user) {
            return null;
        }

        const post = await this.postsRepository.create({
            titulo,
            conteudo,
            usuario: {
                connect: {
                    id: usuarioId
                }
            }
        });

        return post;
    }
}

