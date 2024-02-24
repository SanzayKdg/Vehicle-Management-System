import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/constant';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // check if user exists and access_token is not malformed
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id: payload.sub },
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
