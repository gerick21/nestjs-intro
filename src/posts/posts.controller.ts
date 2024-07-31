import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

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
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created succesfully',
  })
  @ApiOperation({
    summary: 'Creates a new post.',
  })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates on existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated succesfully.',
  })
  @Patch()
  updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }

  @Delete()
  deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
