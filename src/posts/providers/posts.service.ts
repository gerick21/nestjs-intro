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
    private readonly postsRepository: Repository<Post>,

    /*
    In relations 1 to 1 we have to inject repositories from other entities
    It is not such a good practice but we have to do it.

    */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /*Creating new posts */
  async createPost(@Body() createPostDto: CreatePostDto) {
    /*Remember metaOptions are optional. */
    /*
    Due to cascade set to true (in the post entity), we dont need to worry about the metaOptions creation
    because when a post is created that means a meta option will be created as well.
    */

    //Create post
    let newPost = this.postsRepository.create(createPostDto);

    //If the dto had metaOptions, the add them to the post.

    return await this.postsRepository.save(newPost);
  }
  async findAll(userId: string) {
    /*Call the users service and if the user exists, return the post. */

    const user = this.usersService.findOneById(userId);

    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }
}
