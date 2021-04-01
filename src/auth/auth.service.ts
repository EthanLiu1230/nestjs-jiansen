import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async verifyAuthCredentials(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    const user = await this.usersService.findOne({
      where: { username: authCredentialsDto.username },
    });
    if (user) {
      const digestTest = await hash(authCredentialsDto.password, user.salt);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { salt, password, ...result } = user;

      return digestTest == user.password ? result : null;
    }
    return null;
  }
}
