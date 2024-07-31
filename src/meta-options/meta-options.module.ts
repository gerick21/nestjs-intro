import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './meta-options.service';
import { MetaOptionsController } from './meta-options.controller';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService]
})
export class MetaOptionsModule {}
