import {
  BadRequestException,
  Body,
  Injectable,
  Patch,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination-provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

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

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly paginationProvider: PaginationProvider,

    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /*Creating new posts */
  async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }
  async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    /*Call the users service and if the user exists, return the post. */

    let posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
    );

    return posts;
  }

  async deletePost(id: number) {
    /*With the bi directional relations and CASCADE onDelete when we delete the post the metaOptions will be
    deleted as well.
    */
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }

  /*Patch dto extends CreatePostDto, so we can update just a part of a post  */
  @Patch()
  async updatePost(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    /*Find the tags */

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    /*Numbner of tags need to be equal */

    /*Check first if no tags were found at all and number two, if the total number of tags 
    were requested in the patch postdto is not actually equal to the number of tags that were 
    retrieved from the database.
     */

    if (!tags || tags.lenght !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag IDs and ensure they are correct',
        {},
      );
    }

    try {
      /*Find the post */
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connection to the database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException('Post ID does not exist', {});
    }
    /*Update the properties */

    /*If the patchPostDto has the property title, then assign it, if not remain the same title. */

    /*Remember we are updating, so the patchPostDto might not contain all the properties, and
    that is why we check. 
     */
    post.title = patchPostDto.title ?? post.title;

    /*The same for the remain properties */

    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    /*Assign new tags */

    post.tags = tags;
    /*Save the post and return it  */

    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return post;
  }
}
