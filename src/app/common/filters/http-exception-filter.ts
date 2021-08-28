import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Response, Request, response} from 'express';
import {DateTime} from "luxon";
import {ApiProperty} from "@nestjs/swagger";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exRes = exception.getResponse() as object;
        
        res.status(status).json(HttpExceptionResponse.createResponse(
            DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
            req.url,
            ExceptionResponse.createException(exRes)
        ));
    }
}

export class ExceptionResponse {

    @ApiProperty({
        type: Number,
        description: 'HTTP Status Code',
        required: true,
        title: 'HTTP Status Code',
        name: 'statusCode'
    }) statusCode: number;

    @ApiProperty({
        type: [String],
        isArray: true,
        description: 'Error Message',
        required: true,
        title: 'Error Message',
        name: 'message'
    }) message: string;

    @ApiProperty({
        type: String,
        description: 'error',
        required: true,
        title: 'Error',
        name: 'error'
    }) error: string;
    
    static createException(res: any): ExceptionResponse {
        const exception = new ExceptionResponse();
        exception.statusCode = res.statusCode;
        exception.message = res.message;
        exception.error = res.error;
        return exception;
    }
}

export class HttpExceptionResponse {

    @ApiProperty({
        type: String,
        description: 'current time stamp of the exception',
        required: true,
        title: 'TimeStamp',
        name: 'timestamp'
    }) timestamp: string;

    @ApiProperty({
        type: String,
        description: 'origin paath of the exception',
        required: true,
        title: 'Path',
        name: 'path'
    }) path: string;

    @ApiProperty({
        type: ExceptionResponse,
        description: 'current exception value',
        required: true,
        title: 'Exception Response',
        name: 'response'
    }) response: ExceptionResponse;

    static createResponse(timestamp: string, path: string, response: ExceptionResponse): HttpExceptionResponse {
        const res = new HttpExceptionResponse();
        res.timestamp = timestamp;
        res.path = path;
        res.response = response;
        return res;
    }
}