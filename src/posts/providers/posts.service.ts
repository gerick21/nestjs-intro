import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}
  findAll(userId: string) {
    /*Call the users service and if the user exists, return the post. */

    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test Title',
        content: 'Test content',
      },
      {
        user: user,
        title: 'Test Title 2',
        content: 'Test content 2',
      },
    ];
  }
}
