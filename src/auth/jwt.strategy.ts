import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constants';
import { Injectable } from '@nestjs/common';
import { ValidUserDto } from './dto/valid-user.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<ValidUserDto> {
    return { id: payload.sub, username: payload.username };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
