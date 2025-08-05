import { HttpException, HttpStatus } from '@nestjs/common';
import {
  REQUEST_TIMEOUT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from '../constants/constants';

export class CustomError extends HttpException {
  constructor(
    message: string | Record<string, any>,
    status: number,
    name: string,
  ) {
    super(
      {
        statusCode: status,
        error: name,
        message:
          typeof message === 'string'
            ? message
            : message?.message || 'An error occurred',
        ...(typeof message === 'object' ? message : {}),
      },
      status,
    );
    this.name = name;
  }

  static BadRequest(message = 'Bad Request') {
    return new CustomError(message, HttpStatus.BAD_REQUEST, BAD_REQUEST);
  }

  static Conflict(message = 'Conflict') {
    return new CustomError(message, HttpStatus.CONFLICT, CONFLICT);
  }

  static NotFound(message = 'Not Found') {
    return new CustomError(message, HttpStatus.NOT_FOUND, NOT_FOUND);
  }

  static Unauthorized(message = 'Unauthorized') {
    return new CustomError(message, HttpStatus.UNAUTHORIZED, UNAUTHORIZED);
  }

  static Forbidden(message = 'Forbidden') {
    return new CustomError(message, HttpStatus.FORBIDDEN, FORBIDDEN);
  }

  static RequestTimeout(message = 'Request Timeout') {
    return new CustomError(
      message,
      HttpStatus.REQUEST_TIMEOUT,
      REQUEST_TIMEOUT,
    );
  }

  static InternalServerError(message = 'Internal Server Error') {
    return new CustomError(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      INTERNAL_SERVER_ERROR,
    );
  }

  // ...other static methods as needed
}
