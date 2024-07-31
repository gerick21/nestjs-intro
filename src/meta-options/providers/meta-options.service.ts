import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostMetaoptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async createMetaoption(createPostMetaoptionsDto: CreatePostMetaoptionsDto) {
    let newMetaOption = this.metaOptionsRepository.create(
      createPostMetaoptionsDto,
    );

    return await this.metaOptionsRepository.save(newMetaOption);
  }
}
