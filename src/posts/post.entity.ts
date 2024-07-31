import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaoptionsDto } from '../meta-options/dtos/create-post-meta-options.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;

  @Column({
    type: 'text' /*Text let you add more characters than varchar. */,
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp' /*In mysql would be 'datetime' */,
    nullable: true,
  })
  publishOn?: Date;

  /*La opción cascade: true significa que cualquier operación de persistencia realizada en la entidad principal 
  (como guardar o actualizar) se propagará automáticamente a la entidad relacionada. 
  Esto incluye: Insert, Update o remove*/

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    /*For default when we fetch for all the posts in our database, the response wont return the metaOptions
    related to a post, so setting eager:true we force the database to return all the columns along with the foreign keys.
     */
    eager: true,
  })
  /**
   JoinColumn is responsibe for creating a column inside this entity table (Post)
   */
  /*This will create a metya options id column on the post table. */
  metaOptions?: MetaOption;

  /*A post will be related to JUST ONE user */
  @ManyToOne(() => User, (user) => user.posts, {
    /*When we fetch for post the author will be returned as well (eager forces the foreign keys to return) */
    eager: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable()
  tags?: Tag[];
}
