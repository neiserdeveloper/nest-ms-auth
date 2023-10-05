import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post()
    async loginGoogle(@Body() data: any) {
        //1. validate token google
        const dataUser = await this.authService.validateToken(data.token)
        if (!dataUser)
            throw new UnauthorizedException();
        console.log(dataUser);
        //2. save user in db
        this.authService.saveUserBD();
        //3. generate token with jwt
        const accessToken = this.authService.generateJwt(dataUser);

        return { token: accessToken };
    }
}
