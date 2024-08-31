import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { GetSessionInfoDto } from './dto';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private profileService: ProfilesService,
        private passwordService: PasswordService,
        private jwtService: JwtService
    ) {}

    async signUp(email: string, password: string, lastName: string, firstName: string) {
        const user = await this.userService.findByEmail(email)

        if (user) {
            throw new BadRequestException({ type: 'email-exist' })
        }

        const salt = this.passwordService.getSalt()
        const hash = this.passwordService.getHash(password, salt)

        const newUser = await this.userService.create(email, hash, salt)
        await this.profileService.create({
            lastName,
            firstName,
            userId: newUser.id
        })
        const accessToken = this.jwtService.sign({
            id: newUser.id,
            email: newUser.email
        })

        const refreshToken = this.jwtService.sign({
            id: newUser.id,
            email: newUser.email
        }, {
            secret: process.env.JWT_REFRESH_TOKEN,
            expiresIn: '30d',
        })

        return { accessToken, refreshToken }
    }

    async signIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException()
        }

        const hash = this.passwordService.getHash(password, user.salt)

        const isValidPassword = hash === user.hash

        if (!isValidPassword) {
            throw new UnauthorizedException({ type: 'wrong'})
        }

        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email
        })

        const refreshToken = this.jwtService.sign({
            id: user.id,
            email: user.email
        }, {
            secret: process.env.JWT_REFRESH_TOKEN,
            expiresIn: '30d',
        })

        return { accessToken, refreshToken }
    }

    async refreshToken(token: string) {
        const sessionInfo = this.jwtService.verify<GetSessionInfoDto>(token, { secret: process.env.JWT_REFRESH_TOKEN});

        const user = await this.userService.findByEmail(sessionInfo.email)

        if (!user) {
            throw new UnauthorizedException()
        }

        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email
        })

        const refreshToken = this.jwtService.sign({
            id: user.id,
            email: user.email
        }, {
            secret: process.env.JWT_REFRESH_TOKEN,
            expiresIn: '30d',
        })

        return { accessToken, refreshToken }
    }
}
