import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  login(email: string, password: string, id: string) {
    const users = this.usersService.findOneById('1234');
    //check if user exists in database.

    return 'SAMPLE_TOKEN';
  }

  isAuth() {
    return true;
  }
}
