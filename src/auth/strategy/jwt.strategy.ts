import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Ensure your secret is defined
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findById(+payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user; // This will be available in req.user
    }
}
