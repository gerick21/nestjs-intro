import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-may.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,

        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },

        {
          provide: FindOneUserByEmailProvider,
          useValue: {},
        },
        {
          provide: CreateUserProvider,
          useValue: {},
        },
        {
          provide: UsersCreateManyProvider,
          useValue: {},
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it(' should be defined!"', () => {});
    expect(service).toBeDefined();
  });
});
