import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomError } from './custom-error';
import { UNEXPECTED_ERROR } from '../constants/constants';

export class ExceptionHandler {
  constructor(error: Error | CustomError, message?: string) {
    console.info('[Info]:Handling error:', `${error.name}: ${error.message}`);
    console.error('[Stack]:', error.stack);
    if (error instanceof CustomError) {
      this.handle(error.name.concat(':', error.message), error.message);
    }
    this.handle(
      error.name.concat(':', error.message),
      message || UNEXPECTED_ERROR,
    );
  }

  private handle(error: string, message?: string): void {
    if (this.isNotFound(error)) {
      throw new NotFoundException(message);
    }

    if (this.isUnauthorized(error)) {
      throw new UnauthorizedException(message);
    }

    if (this.isForbidden(error)) {
      throw new ForbiddenException(message);
    }

    if (this.isConflict(error)) {
      throw new ConflictException(message);
    }

    if (this.isBadRequest(error)) {
      throw new BadRequestException(message);
    }

    // If no known error matched, throw 500
    console.error('[Error]: Unhandled error:', error);
    throw new InternalServerErrorException('An unexpected error occurred');
  }

  // 404
  private isNotFound(error: string): boolean {
    return (
      error.includes('NotFoundException') ||
      error.includes('EntityMetadataNotFoundError')
    );
  }

  // 401
  private isUnauthorized(error: string): boolean {
    return (
      error.includes('UnauthorizedException') ||
      error.includes('JsonWebTokenError: invalid signature') ||
      error.includes('TokenExpiredError:jwt expired')
    );
  }

  // 403
  private isForbidden(error: string): boolean {
    return error.includes('ForbiddenException') || error.includes('forbidden');
  }

  // 409
  private isConflict(error: string): boolean {
    return (
      error.includes('ConflictException') ||
      error.includes('duplicate key value violates unique constraint') ||
      error.includes('email already exists')
    );
  }

  // 400
  private isBadRequest(error: string): boolean {
    return error.includes('BadRequestException');
  }
}
