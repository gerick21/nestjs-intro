import { Injectable } from '@nestjs/common';
import { metaOption } from './meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(metaOption)
    private readonly metaOptionRepository: Repository<metaOption>,
  ) {}
}
