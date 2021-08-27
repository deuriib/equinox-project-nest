import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import{Response, Request, response} from 'express';
import {DateTime} from "luxon";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        res.status(status).json({
            timestamp: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
            path: req.url,
            response: exception.getResponse(),
        })
    }
    
}