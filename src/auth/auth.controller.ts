import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { ValidUser } from './valid-user.decorator';
import { ValidUserDto } from './dto/valid-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * With LocalAuthGuard,
   * the @Req() req parameter will be attached with a user property
   * (populated by Passport during the passport-local authentication flow),
   * which is then can be extracted with @ValidUser().
   */
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @ValidUser() user: ValidUserDto,
  ): { access_token: string } {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    console.log('authCredentialsDto ->', authCredentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Req() req) {
    return req.user;
  }
}
