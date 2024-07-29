import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  helloWorld(): string {
    return 'Hello from users service.';
  }

  findAllUsers() {
    return [
      {
        firstName: 'John',
        email: 'johndoe@gmail.com',
      },
      {
        firstName: 'Ryan',
        email: 'ryan@gmail.com',
      },
      {
        firstName: 'Jim',
        email: 'jim@gmail.com',
      },
    ];
  }
}
