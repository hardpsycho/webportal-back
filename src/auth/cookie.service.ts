import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
    static lcTokenKey = 'refresh-token'

    setRefreshToken(res: Response, token: string) {
        res.cookie(CookieService.lcTokenKey, token, {
            httpOnly: true,
            maxAge: 30*60*60*24*1000,
            sameSite: 'lax',
            path: '/auth/refresh'

        })
    }

    removeRefreshToken(res: Response) {
        res.clearCookie(CookieService.lcTokenKey)
    }
}
60*60*2