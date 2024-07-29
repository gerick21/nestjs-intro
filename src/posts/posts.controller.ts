import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  /*http://localhost:3000/posts */

  @Get('/:userId?')
  getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }
}
