import { Injectable } from "@nestjs/common"

@Injectable()
export default class ResponseHandler {


    buildGenericResponse(code: number, message: string, result?: any) {
        return {
            code,
            message,
            result
        }
    }


    buildErrorResponse(code: number, message: string, description: string) {
        return {
            code,
            message,
            description
        }
    }
}