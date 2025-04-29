import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let message = exception.message || 'An error occurred';
    let error = 'Unknown Error';

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const errorObj = exceptionResponse as any;
      message = errorObj.message || message;
      error = errorObj.error || error;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,

      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
