import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Auth(AuthType.None)
  async SignIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
