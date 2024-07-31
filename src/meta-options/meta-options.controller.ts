import { Controller, Inject, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaoptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    @Inject()
    private readonly metaOptionService: MetaOptionsService,
  ) {}

  @Post()
  createMetaOption(createPostMetaoptionsDto: CreatePostMetaoptionsDto) {
    this.metaOptionService.createMetaoption(createPostMetaoptionsDto);
  }
}
