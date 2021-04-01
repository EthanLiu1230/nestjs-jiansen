import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req) {
    console.log('req -> ', req);
    return req.user;
  }
}
