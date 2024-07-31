import { MetaOption } from './meta-option.entity';
import { MetaOptionsController } from './meta-options.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsService } from './providers/meta-options.service';

@Module({
  controllers: [MetaOptionsController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
  exports: [MetaOptionsService],
})
export class MetaOptionsModule {}
