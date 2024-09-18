import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  sigin(@Body() signinDto: SigninDto) {
    return this.authService.sigin(signinDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
