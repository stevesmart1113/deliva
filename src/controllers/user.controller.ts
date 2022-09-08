import { Body, Controller, Delete, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import UserAuthDTO from "src/dto/user.auth.dto";
import UserDTO from "src/dto/user.dto";
import UserService from "src/services/user.service";

@Controller("users")
@ApiTags("user")
export default class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("list")
    getAll() {
       return this.userService.getAllUsers();
    }

    @Post("create")
    async create(@Body() user: UserDTO) {
        return await this.userService.createUser(user);
    }

    @Put("update/:id")
    update(@Param("id") id: number, @Body() user: UserDTO){
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
        let currentUser = this.userService.findUserByEmail(user.email);

        if(currentUser != null) {
            
        }else{

        }
    }

}
