import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import UserDTO from "src/dto/user.dto";
import HashUtils from "src/utils/hash.utils";
import { PrismaService } from "../common/prisma.client";


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
        private readonly hash: HashUtils
    ) {

    }

    /**
     * 
     * @returns all user accounts
     * 
     */
    getAllUsers() {
        return this.prisma.user.findMany();
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
        return (this.hash.compare(raw, hashed)) ? true : false
    }

    findUserByEmail(email: string) {
        return this.prisma.user.findFirstOrThrow({where: {email: email}});
    }

}