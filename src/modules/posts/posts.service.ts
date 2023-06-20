import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma';
import { CreatePostsDto } from './dto/CreatePosts.dto';
import { Posts } from '@prisma/client';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/UpdatePosts.dto';
@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  //create posts
  async createPosts(postDetails: CreatePostsDto): Promise<Posts> {
    return this.prisma.posts.create({
      data: {
        title: postDetails.title,
        body: postDetails.body,
        User: {
          connect: {
            id: postDetails.userId,
          },
        },
      },
    });
  }

  async getAllPosts(): Promise<Posts[]> {
    return this.prisma.posts.findMany({
      include: {
        User: true,
      },
    });
  }

  async getPostById(id: number): Promise<Posts> {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async updatePostsById(
    id: number,
    postDetails: UpdatePostDto,
  ): Promise<Posts> {
    await this.getPostById(id);
    return this.prisma.posts.update({
      where: {
        id,
      },
      data: {
        title: postDetails.title,
        body: postDetails.body,
      },
    });
  }

  async deletePostById(id: number): Promise<Posts> {
    await this.getPostById(id);
    const deletePost = await this.prisma.posts.delete({
      where: { id },
    });

    return deletePost;
  }
}
