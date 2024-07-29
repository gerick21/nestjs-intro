import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  /*http://localhost:3000/posts */

  @Get('/:userId?')
  getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {}
}
