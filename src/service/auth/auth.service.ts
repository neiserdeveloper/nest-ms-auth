import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    async validateToken(token: string) {
        const clientId = 'MY_CLIENT_ID';
        const client = new OAuth2Client(clientId);
        try {
            const verifiy = await client.verifyIdToken(
                {
                    idToken: token,
                    audience: clientId
                }
            )
            const user = verifiy.getPayload();
            return user;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    saveUserBD() {
        return true;
    }

    generateJwt(user: any) {
        const JWT_SECRET = 'HSHXUSNS83923BDNSJBNDSA';
        const payload = { email: user.email, user: user.name, id: user.id };
        const accesToken = this.jwtService.sign(payload, { secret: JWT_SECRET, expiresIn: '15min' })
        return accesToken;
    }
}
