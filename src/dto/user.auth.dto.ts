import { ApiProperty } from "@nestjs/swagger";

export default class UserAuthDTO {
    @ApiProperty() email: string;
    @ApiProperty() password: string;
}