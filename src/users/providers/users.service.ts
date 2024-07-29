import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  helloWorld(): string {
    return 'Hello from users service.';
  }

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
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

  /*Find a user by id */
  findOneById(id: string) {
    return {
      id: 123,
      firstName: 'Stanley',
      email: 'stanleyhudson@gmail.com',
    };
  }
}
