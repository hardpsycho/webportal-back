import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';
import { UsersModule } from 'src/users/users.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [UsersModule, ProfilesModule, DbModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService, ProfilesService]
})
export class AuthModule {}
