import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
