import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    let newPost = this.postRepository.create(createPostDto);

    await this.postRepository.save(createPostDto);
  }
  findAll(userId: string) {
    /*Call the users service and if the user exists, return the post. */

    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test Title',
        content: 'Test content',
      },
      {
        user: user,
        title: 'Test Title 2',
        content: 'Test content 2',
      },
    ];
  }
}
