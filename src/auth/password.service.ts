import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class PasswordService {
    getSalt(): string {
        return randomBytes(16).toString('hex')
    }

    getHash(password: string, salt: string): string {
        return pbkdf2Sync(password, salt, 100, 50, 'sha512' ).toString('hex')
    }
}
