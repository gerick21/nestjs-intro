import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { error } from 'console';

/**
 * Class to connect Users table and perform business operations.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly dataSource: DataSource,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    //check if user exists with same email

    try {
      existingUser = await this.usersRepository.findOne({
        //checks if email exists.
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connection to the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exists', {});
    }

    //Handle exception if user does not exist.
    //TODO
    //Create user
    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return newUser;
  }

  /**
   * The method to get all the users from the database.
  
   */
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    /*Custom exception */
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      /*This is not sent back to the client. */
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Ocurred because the API endpoint was permantly moved',
      },
    );
  }

  /**
   * Find a single users given the ID of the user.
  
   */
  async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your rquest at the moment, please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    /*Handle if the user does not exist. */

    if (!user) {
      throw new BadRequestException('User id does not exist.');
    }

    return user;
  }

  async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect the query ryunner to the datasource
    await queryRunner.connect();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createUsersDto) {
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
