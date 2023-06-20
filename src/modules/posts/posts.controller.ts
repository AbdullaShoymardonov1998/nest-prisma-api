import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/CreatePosts.dto';
import { Posts } from '@prisma/client';
import { UpdatePostDto } from './dto/UpdatePosts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // create Posts
  @Post()
  createPosts(@Body() postDetails: CreatePostsDto): Promise<Posts> {
    return this.postService.createPosts(postDetails);
  }

  //getAll posts
  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  //get post by id
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  updatePosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() postDetails: UpdatePostDto,
  ): Promise<Posts> {
    return this.postService.updatePostsById(id, postDetails);
  }

  @Delete(':id')
  deletePosts(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postService.deletePostById(id);
  }
}
