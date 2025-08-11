import { PostsInterfaceRepository } from "@/MVC/repositories/interfaceRepository/postsInterfaceRepository";


export class DeletePostService {
    constructor(private postsRepository: PostsInterfaceRepository) {}

    async execute(id: string): Promise<boolean | null> {
        const post = await this.postsRepository.findById(id);

        if (!post) {
            return null;
        }

        const deleted = await this.postsRepository.delete(id);

        return deleted;
    }

}