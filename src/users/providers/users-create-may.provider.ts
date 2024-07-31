import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-may-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject the datasource
     */
    private dataSource: DataSource,
  ) {}

  async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect the query ryunner to the datasource
    await queryRunner.connect();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      //Finally is used does not matter if the operation completed succesfully or we catched an exception, both will enter here.
      // you need to release a queryRunner which was manually instantiated doesnt matter if it was successfull or unsuccessfull
      await queryRunner.release();
    }

    return newUsers;
  }
}
