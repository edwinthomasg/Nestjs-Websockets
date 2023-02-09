import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class BadReqFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const [req, res, next] = host.getArgs()
        res.status(exception.status).json({
            statusCode: exception.status
        })
    }
}