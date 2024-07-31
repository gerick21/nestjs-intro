import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /*
    In relations 1 to 1 we have to inject repositories from other entities
    It is not such a good practice but we have to do it.

    */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /*Creating new posts */
  async createPost(@Body() createPostDto: CreatePostDto) {
    /*We need to create metaOptions first in order to create a post (due to the @joinColumn() dependency.) */
    /*Remember metaOptions are optional. */
    /*Create metaOptions. */
    /*If the createPostDto has metaOptions we create them with the repository, if not just continue. */
    let metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    /*Save the metaOptions in the database*/
    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }

    //Create post
    let newPost = this.postRepository.create(createPostDto);

    //If the dto had metaOptions, the add them to the post.

    if (metaOptions) {
      newPost.metaOptions = metaOptions;
    }

    return await this.postRepository.save(newPost);
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
