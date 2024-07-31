import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsService } from './providers/tags.service';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
