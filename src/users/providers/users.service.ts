import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect Users table and perform business operations.
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly usersRepositosy: Repository<User>,
  ) {}

  /**
   * The method to get all the users from the database.
  
   */
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
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
  findOneById(id: string) {
    return {
      id: 123,
      firstName: 'Stanley',
      email: 'stanleyhudson@gmail.com',
    };
  }
}
