import { Prisma } from "@/generatedORMFiles/prisma";
import { PostsInterfaceRepository } from "../interfaceRepository/postsInterfaceRepository";
import { prisma } from "@/ORMLib/prisma";


export class PrismaPostRepository implements PostsInterfaceRepository {
    async create(data: Prisma.PostCreateInput) {
        try {
            const post = await prisma.post.create({
                data,
                include: {
                    usuario: true,
                }
            });

            return post;
        } catch (error) {
            return null;
        }
    }

    async findAll() {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            foto: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            return posts;
        } catch (error) {
            return null;
        }
    }

    async findById(id: string) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: id
                }
            });
            return post;
        } catch (error) {
            return null;
        }
    }

    async update(id: string, data: Prisma.PostUpdateInput) {
        try {
            const post = await prisma.post.update({
                where: {
                    id: id
                },
                data
            });

            return post;
        } catch (error) {
            return null;
        }
    }

    async delete(id: string) {
        try {
            await prisma.post.delete({
                where: {
                    id: id
                }
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async findByUserId(userId: string) {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    usuarioId: userId
                }
            });

            return posts;
        } catch (error) {
            return null;
        }
    }
}
            
