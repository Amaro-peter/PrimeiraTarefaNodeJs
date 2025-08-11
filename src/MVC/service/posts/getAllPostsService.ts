import { Post } from "@/generatedORMFiles/prisma";
import { PostsInterfaceRepository } from "@/MVC/repositories/interfaceRepository/postsInterfaceRepository";


export class GetAllPostsService {
    constructor(private postsRepository: PostsInterfaceRepository) {}

    async execute(): Promise<Post[] | null> {
        const posts = await this.postsRepository.findAll();

        if(!posts) {
            return null;
        }

        return posts;
    }
}