import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.verifyAuthCredentials({
      username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    // will be attached to @Req() req object, as in `req.user`
    return user;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
