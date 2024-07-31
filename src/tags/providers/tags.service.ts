import { Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async createTag(@Body() createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  async findMultipleTags(tags: number[]) {
    let results = undefined;

    try {
      results = await this.tagsRepository.find({
        where: {
          id: In(tags),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connection to the database',
        },
      );
    }

    return results;
  }

  async deleteTag(id: number) {
    await this.tagsRepository.delete(id);

    return await {
      deleted: true,
      id,
    };
  }

  async softRemove(id: number) {
    /*With softRemove it will just create a timestamp and not remove it from the database. */
    await this.tagsRepository.softDelete(id);

    return await {
      deleted: true,
      id,
    };
  }
}
