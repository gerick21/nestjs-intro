import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Is not a string',
  })
  @IsNotEmpty({
    message: 'Property its empty',
  })
  @MinLength(3, {
    message: 'Min lenght is 3 characters',
  })
  @MaxLength(96, {
    message: 'Max lenght is 96 characters',
  })
  firstName: string;

  /*Using ? and the is optional decorator we assure the 
  lastName property can be optional.
  */

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsString({
    message: 'Is not a string',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8) /*Min 8 characters in the password */
  /*This will ensure its a strong password */
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$ !%*#?&])[A-Za-z\d@$ !%*#?&]{8,}$/, {
    message:
      'Minimun eight characters, at least one letter, one number,and one special character. ',
  })
  password: string;
}
