import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { BadRequestException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository;
  const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },

        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => user.password),
          },
        },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('createUser', () => {
    describe('When User Does Not Exist', () => {
      it('Should create a new user', async () => {
        usersRepository.findOne.mockResolvedValue(null);
        usersRepository.create.mockReturnValue(user);
        usersRepository.save.mockResolvedValue(user);

        const newUser = await provider.createUser(user);

        expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: { email: user.email },
        });
        expect(usersRepository.create).toHaveBeenCalledWith(user);
        expect(usersRepository.save).toHaveBeenCalledWith(user);
      });
    });
    describe('When Same User Exist', () => {
      it('Should Throw BadRequestException', async () => {
        usersRepository.findOne.mockResolvedValue(user.email);
        usersRepository.create.mockReturnValue(user);
        usersRepository.save.mockResolvedValue(user);
        try {
          const newUser = await provider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
