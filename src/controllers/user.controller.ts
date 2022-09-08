import { Controller, Injectable } from "@nestjs/common";
import UserService from "src/services/user.service";

@Controller()
export default class UserController {

    constructor(private readonly userService: UserService) {}

    getAll() {
       return this.userService.getAllUsers();
    }
}