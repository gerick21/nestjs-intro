import { Column, Entity } from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaoptionsDto } from './dtos/create-post-meta-options.dto';

@Entity()
export class Post {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  publishOn: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tags: string[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  metaOptions: CreatePostMetaoptionsDto;
}
