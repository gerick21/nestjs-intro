import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

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
    console.log(this.profileConfiguration);
    return [
      {
        firstName: 'Dwight',
        email: 'dwightschrute@gmail.com',
      },
      {
        firstName: 'Pam',
        email: 'pambeasly@gmail.com',
      },
      {
        firstName: 'Jim',
        email: 'jimhalpert@gmail.com',
      },
    ];
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
}
