import { Injectable } from "@nestjs/common"

@Injectable()
export default class ResponseHandler {


    buildGenericResponse(code: number, message: string, data?: any, token?: any) {
        return {
            code,
            message,
            data,
            token
        }
    }


    buildErrorResponse(code: number, message: string, description: string) {
        return {
            code,
            message,
            description
        }
    }

    buildSuccessResponse(code: number, message: string, description: string) {

     return {
             code,
	     message,
	     description
     }
    }
	
	
}
