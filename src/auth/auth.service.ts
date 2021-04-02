import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ValidUserDto } from './dto/valid-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifyAuthCredentials(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ValidUserDto | null> {
    const user = await this.usersService.findOne({
      where: { username: authCredentialsDto.username },
    });
    if (user) {
      const digestTest = await hash(authCredentialsDto.password, user.salt);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const validUserDto: ValidUserDto = {
        id: user.id,
        username: user.username,
      };

      return digestTest == user.password ? validUserDto : null;
    }
    return null;
  }

  signAccessToken(user: ValidUserDto): { access_token: string } {
    // console.log('user => ', user);
    const { username, id } = user;
    const payload: JwtPayloadDto = { username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
