import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class HashUtils {

    async hashPassword(password: string) {
        return bcrypt.hashSync(
            password,
            10
        );
    }

    async compare(password: string, hashedPassword: string) {
        return bcrypt.compareSync(
            password,
            hashedPassword
        );
    }
}