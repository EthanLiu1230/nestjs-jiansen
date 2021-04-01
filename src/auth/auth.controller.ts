import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The @Req() req parameter will contain a user property
  // (populated by Passport during the passport-local authentication flow)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req): Promise<{ access_token: string }> {
    // const payload = {username: user.username, sub: user.us}
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Req() req) {
    return req.user;
  }
}
