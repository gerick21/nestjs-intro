import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(usersService: UsersService) {}
}
