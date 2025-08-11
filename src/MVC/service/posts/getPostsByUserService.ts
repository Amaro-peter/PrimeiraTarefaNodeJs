import { PostsInterfaceRepository } from "@/MVC/repositories/interfaceRepository/postsInterfaceRepository";


export class GetPostsByUserService {
    constructor(private postsRepository: PostsInterfaceRepository) {}

    async execute(userId: string) {
        const posts = await this.postsRepository.findByUserId(userId);
        return posts;
    }
}