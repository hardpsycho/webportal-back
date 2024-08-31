import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbService } from './db/db.service'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ProfilesModule } from './profiles/profiles.module'

@Module({
    imports: [
        DbModule,
        AuthModule,
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_ACCESS_TOKEN,
            signOptions: { expiresIn: '10m' }
        }),
        ProfilesModule
    ],
    controllers: [AppController],
    providers: [AppService, DbService]
})
export class AppModule {}
