import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  @Column()
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  @Column()
  password: string;

  /*A user can have 1 to several posts. */
  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];
}
