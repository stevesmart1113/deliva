import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../common/prisma.client";

@Injectable()
export default class UserService {

    constructor(private readonly prisma: PrismaService) {

    }

    /**
     * 
     * @returns all user accounts
     * 
     */
    getAllUsers() : Promise<User[]| null>{
        return this.prisma.user.findMany();
    }


    /**
     * 
     * @param user 
     * @returns creates a user account
     */
    createUser(user: User) {
        return this.prisma.user.create({
           data: user
        })
    }

}