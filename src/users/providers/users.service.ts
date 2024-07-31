import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
    //check if user exists with same email
    const existingUser = await this.usersRepository.findOne({
      //checks if email exists.
      where: {
        email: createUserDto.email,
      },
    });
    //Handle exception if user does not exist.
    //TODO
    //Create user

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

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
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
