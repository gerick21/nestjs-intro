import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostMetaoptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async createMetaoption(createPostMetaoptionsDto: CreatePostMetaoptionsDto) {
    let newMetaOptions = this.metaOptionRepository.create(
      createPostMetaoptionsDto,
    );

    await this.metaOptionRepository.save(createPostMetaoptionsDto);
  }
}
