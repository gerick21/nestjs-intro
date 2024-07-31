import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /*
    In relations 1 to 1 we have to inject repositories from other entities
    It is not such a good practice but we have to do it.

    */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /*Creating new posts */
  async createPost(@Body() createPostDto: CreatePostDto) {
    //Find author from database based on authorId
    let user = await this.usersRepository.findOneBy({
      id: createPostDto.authorId,
    });

    //Find tags

    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    /*Remember metaOptions are optional. */
    /*
    Due to cascade set to true (in the post entity), we dont need to worry about the metaOptions creation
    because when a post is created that means a meta option will be created as well.
    */

    //Create post
    let newPost = this.postsRepository.create({
      ...createPostDto,
      author: user,
      tags: tags,
    });

    //If the dto had metaOptions, the add them to the post.

    return await this.postsRepository.save(newPost);
  }
  async findAll(userId: string) {
    /*Call the users service and if the user exists, return the post. */

    let posts = await this.postsRepository.find({
      relations: {
        /*When we fetch post this set to true will also return the metaOptions along with the author. */
        metaOptions: true,
        author: true,
      },
    });

    return posts;
  }

  async deletePost(id: number) {
    /*With the bi directional relations and CASCADE onDelete when we delete the post the metaOptions will be
    deleted as well.
    */
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
