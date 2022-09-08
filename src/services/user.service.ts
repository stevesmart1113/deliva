import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import UserDTO from "src/dto/user.dto";
import { Tokens } from "src/types/token.types";
import HashUtils from "src/utils/hash.utils";
import { PrismaService } from "../common/prisma.client";
import { JwtService } from "@nestjs/jwt";


/**
 *   _   _ ___  ___ _ __ 
| | | / __|/ _ \ '__|
| |_| \__ \  __/ |   
 \__,_|___/\___|_|   
                     
 */

@Injectable()
export default class UserService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly hash: HashUtils,
        private readonly jwtService: JwtService
    ) {

    }

    /**
     * 
     * @returns all user accounts
     * 
     */
    async getAllUsers(skip: number, take: number): Promise<User[] | null> {
        const sk = ((skip - 1) * take);
        const tk = take;
        return this.prisma.user.findMany(
            {
                skip: sk,
                take: tk,
                orderBy: {
                    id: 'asc'
                }
            }
        );
    }


    /**
     * 
     * @param user 
     * @returns creates a user account
     */
    async createUser(user: UserDTO) {
        user.password = await this.hash.hashPassword(user.password);
        console.log(user.password);
        return this.prisma.user.create({
            data: user
        });
    }

    /**
     * 
     * @param id 
     * @param user 
     * @returns a users account details after an update has taken place.
     */
    updateUserDetails(id: number, user: UserDTO) {
        return this.prisma.user.update({
            where: {
                id: id
            },
            data: user
        })
    }

    deleteUser(id: number) {
        return this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }

    compareHashedVsRaw(raw: string, hashed: string) {
        return this.hash.compare(
            raw,
            hashed
        );
    }

    findUserByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        });
    }

    findUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id: id } });
    }

    timeSince(date: any) {
        const today: any = new Date();
        const currentDate = Math.floor(today - date * 1000);
        const expiresIn = new Date(currentDate);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
            timeStyle: "medium"
        }).format(expiresIn);
    }

    async getToken(userId: number, email: string): Promise<Tokens> {
        const expiresIn = 60 * 60 * 24 * 7;
        try {
            const [at, rt, ep] = await Promise.all([
                this.jwtService.signAsync({
                    sub: userId, email
                }, {
                    secret: "at-secret",
                    expiresIn: "1h"
                }),
                this.jwtService.signAsync({
                    sub: userId, email
                }, {
                    secret: "rt-secret",
                    expiresIn: expiresIn
                }),
                this.timeSince(new Date(Date.now() - expiresIn))
            ]);
            return {
                access_token: at,
                refresh_token: rt,
                expiresIn: ep
            };
        } catch (err) {
            throw err;
        }
    }

}