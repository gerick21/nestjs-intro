import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaoptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionService: MetaOptionsService) {}

  @Post()
  createMetaOption(@Body() createPostMetaoptionsDto: CreatePostMetaoptionsDto) {
    this.metaOptionService.createMetaoption(createPostMetaoptionsDto);
  }
}
