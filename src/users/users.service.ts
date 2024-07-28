import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  helloWorld(): string {
    return 'Hello from users service.';
  }
}
