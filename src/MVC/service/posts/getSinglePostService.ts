import { Post } from "@/generatedORMFiles/prisma";
import { PostsInterfaceRepository } from "@/MVC/repositories/interfaceRepository/postsInterfaceRepository";


export class GetSinglePostService {
    constructor(private postsRepository: PostsInterfaceRepository) {}

    async execute(id: string): Promise<Post | null> {
        const post = await this.postsRepository.findById(id);
        if (!post) return null;
        return post;
    }
}