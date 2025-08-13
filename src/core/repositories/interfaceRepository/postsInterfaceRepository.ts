import { Post, Prisma } from "@/generatedORMFiles/prisma";

export interface PostsInterfaceRepository {
    create(data: Prisma.PostCreateInput): Promise<Post | null>;
    findAll(): Promise<Post[] | null>;
    findById(id: string): Promise<Post | null>;
    update(id: string, data: Prisma.PostUpdateInput): Promise<Post | null>;
    delete(id: string): Promise<boolean>;
    findByUserId(userId: string): Promise<Post[] | null>;
}