export const UNEXPECTED_ERROR: string = 'An unexpected error occurred';

// Nest JS Exceptions
export const REQUEST_TIMEOUT: string = 'RequestTimeoutException';
export const BAD_REQUEST: string = 'BadRequestException';
export const UNAUTHORIZED: string = 'UnauthorizedException';
export const FORBIDDEN: string = 'ForbiddenException';
export const NOT_FOUND: string = 'NotFoundException';
export const CONFLICT: string = 'ConflictException';
export const INTERNAL_SERVER_ERROR: string = 'InternalServerErrorException';

export enum RecordStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
