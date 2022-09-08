import { ApiProperty } from "@nestjs/swagger";

export default class UserDTO {
    @ApiProperty() firstName: string;
    @ApiProperty() lastName: string;
    @ApiProperty() email: string;
    @ApiProperty() password: string;
    @ApiProperty() status: number;
    @ApiProperty() createdAt: Date
    @ApiProperty() updatedAt: Date
}