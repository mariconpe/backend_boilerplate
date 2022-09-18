import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<any> {
    const user = await this.userService.findById(payload.sub);
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      access: user.access,
    };
  }
}
