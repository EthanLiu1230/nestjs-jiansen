import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The @Req() req parameter will contain a user property
  // (populated by Passport during the passport-local authentication flow)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req) {
    // const payload = {username: user.username, sub: user.us}
    return this.authService.signIn(req.user);
  }
}
