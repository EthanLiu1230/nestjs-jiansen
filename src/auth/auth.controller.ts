import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { ValidUser } from './valid-user.decorator';
import { ValidUserDto } from './dto/valid-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The @Req() req parameter will contain a user property
  // (populated by Passport during the passport-local authentication flow)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@ValidUser() user: ValidUserDto): { access_token: string } {
    return this.authService.signAccessToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Req() req) {
    return req.user;
  }
}
