import { Post } from "@/generatedORMFiles/prisma";
import { PostsInterfaceRepository } from "@/core/repositories/interfaceRepository/postsInterfaceRepository";

interface UpdatePostServiceRequest {
    id: string;
    titulo: string | undefined;
    conteudo: string | undefined;
}


export class UpdatePostService {
    constructor(private postsRepository: PostsInterfaceRepository) {}

    async execute({ id, titulo, conteudo }: UpdatePostServiceRequest): Promise<Post | null> {
        const updateData: any = {};

        if(titulo !== undefined) {
            updateData.titulo = titulo;
        }

        if(conteudo !== undefined) {
            updateData.conteudo = conteudo;
        }

        const post = await this.postsRepository.update(id, updateData);

        if(!post) {
            return null;
        }
        
        return post;
    }
}