import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './providers/meta-options.service';
import { MetaOption } from './meta-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionsModule {}
