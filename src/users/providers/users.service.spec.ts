import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-may.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    let mockCreateProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) => {
        return Promise.resolve({
          //jest will use this mock to create a user, for testing purposes
          id: 1,
          email: createUserDto.email,
          password: createUserDto.password,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        });
      },
    };

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
          useValue: { mockCreateProvider },
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

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });
    it('should call createUser on CreateUserProvider', async () => {
      let user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoeemail',
        password: 'password',
      });

      expect(user.firstName).toBe('John');
    });
  });
});
