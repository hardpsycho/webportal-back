import { AuthGuard } from './auth.guard'
import { SignInBodyDto, SignUpBodyDto, GetSessionInfoDto } from './dto'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CookieService } from './cookie.service';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService, private cookieService: CookieService) {}

    @Post('sign-up')
    @HttpCode(HttpStatus.OK)
    @ApiCreatedResponse()
    async signUp(@Body() body: SignUpBodyDto, @Res({passthrough: true}) res: Response) {
        const { accessToken, refreshToken } = await this.authService.signUp(body.email, body.password, body.firstName, body.lastName)

        console.log('tokens1:', accessToken, 'tokens2:', refreshToken)

        this.cookieService.setRefreshToken(res, refreshToken)

        return {
            accessToken
        }
    }
    
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    async signIn(@Body() body: SignInBodyDto, @Res({passthrough: true}) res: Response) {
        const { accessToken, refreshToken } = await this.authService.signIn(body.email, body.password)

        this.cookieService.setRefreshToken(res, refreshToken)

        return {
            accessToken
        }
    }

    @Post('sign-out')
    @ApiOkResponse()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async signOut(@Res({passthrough: true}) res: Response) {
        this.cookieService.removeRefreshToken(res)
    }

    @Get('session')
    @ApiOkResponse()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getSession(@SessionInfo() session: GetSessionInfoDto) {
        return session
    }

    @Get('refresh')
    @ApiOkResponse()
    async refresh(@Req() request: Request, @Res({passthrough: true}) res: Response) {
        const token = request.cookies[CookieService.lcTokenKey]

        console.log('token', token)

        if (!token) {
            throw new UnauthorizedException()
        }

        const { accessToken, refreshToken } = await this.authService.refreshToken(token)

        this.cookieService.setRefreshToken(res, refreshToken)

        return {
            accessToken
        }
    }
}
