import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { query } from "express";
import ResponseHandler from "src/dto/response.handler";
import UserAuthDTO from "src/dto/user.auth.dto";
import UserDTO from "src/dto/user.dto";
import UserService from "src/services/user.service";

@Controller("users")
@ApiTags("user")
export default class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly response: ResponseHandler) { }

    //@UseGuards(AuthGuard('jwt'))
    //@ApiBearerAuth('defaultBearerAuth')
    @Get("list")
    async getAll(
        @Query('skip') skip: number, @Query('take') take: number) {
        return await this.userService.getAllUsers(
            +skip, 
            +take
        );
    }

    @Post("create")
    async create(@Body() user: UserDTO) {
        return await this.userService.createUser(user);
    }

    @Put("update/:id")
    update(@Param("id") id: number, @Body() user: UserDTO) {
        return this.userService.updateUserDetails(
            +id,
            user
        );
    }

    @Delete("delete/:id")
    deleteUser(@Param("id") id: number) {
        return this.userService.deleteUser(
            +id
        );
    }

    @Post("auth")
    async authenticateUserCredentials(@Body() user: UserAuthDTO) {
        let currentUser = await this.userService.findUserByEmail(user.email);
        if (currentUser != null) {
            let truth = await this.userService.compareHashedVsRaw(
                user.password,
                currentUser.password
            );
            if (truth) {
                const tokens = await this.userService.getToken(
                    currentUser.id,
                    currentUser.email
                );
                currentUser.password == undefined
                return this.response.buildGenericResponse(
                    1001,
                    "User authentication successful",
                    currentUser,
                    tokens
                )
            } else {
                return this.response.buildErrorResponse(
                    8008,
                    "User does not exist",
                    "An error occurred, invalid user credentials"
                )
            }
        } else {
            return this.response.buildErrorResponse(
                8008,
                "User not found",
                `User with email ${user.email} does not exist`
            )
        }
    }

    @Get('user/status')
    checkUserStatus() {
       return null;
    }


}
