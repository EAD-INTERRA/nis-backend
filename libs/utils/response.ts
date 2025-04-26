import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";

export const errorCodes = {
  SUCCESS: 0,
  BAD_REQUEST: 1,
  UNAUTHORIZED: 2,
  NOT_FOUND: 3,
  EXCEPTION: 4,
  FORBIDDEN: 5
};

const responseCodes = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INVALID_REQUEST: 400,
  FORBIDDEN: 403,
  TIMEOUT: 403,
  EXCEPTION: 500,
};

const responseMessages = {
  SUCCESS: "SUCCESSFUL",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT FOUND",
  INVALID_REQUEST: "INVALID REQUEST",
  FORBIDDEN: "FORBIDDEN",
  TIMEOUT: "GATEWAY TIMEOUT",
  EXCEPTION: "INTERNAL SERVER ERROR",
};


export function extractMeaningfulError(
  error: any,
  keywords: string[] = ['Invalid', 'Missing', 'Failed', 'not found', 'required']
): string {
  const raw = typeof error === 'string' ? error : error?.message || String(error);

  // Split error into lines
  const lines = raw.split('\n').map(line => line.trim());

  // Filter lines that match any keyword
  const meaningfulLines = lines.filter(line =>
    keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))
  );

  // Fallback: return first non-empty line if no match
  if (meaningfulLines.length === 0) {
    return lines.find(line => line.length > 0) || 'An unexpected error occurred';
  }

  return meaningfulLines.join(' | ');
}

export interface ServiceResponse {
  code: number,
  body: any,
  message?: string,
}


export interface CustomHttpResponse {
  statusCode?: number,
  body?: any,
  message?: any,
  customMessage?: string,
}

export function success(body: any, message?: string) {
  return {
    code: errorCodes["SUCCESS"],
    body: body,
    message: message
  };
}


export function badRequest(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new BadRequestException({
    customMessage,
    statusCode: responseCodes.INVALID_REQUEST,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
  })
}

export function unauthorized(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new UnauthorizedException({
    customMessage,
    code: responseCodes.UNAUTHORIZED,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
  })
}

export function notFound(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new NotFoundException({
    customMessage,
    code: responseCodes.NOT_FOUND,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
  })
}

export function exception(data: CustomHttpResponse) {
  // if (data.message instanceof Error && data.message.name.includes('Exception')) {
  //   // throw data; // Just throw the native error
  //   throw data.message
  // }

  const { message, customMessage, ...rest } = data
  throw new InternalServerErrorException({
    customMessage,
    code: responseCodes.EXCEPTION,
    body: null,
    message,
    error: 
    // extractMeaningfulError(
      message?.stack,
    // ) 
    // || 
    // JSON.stringify(message, null, 2),
  })
}

export function forbidden(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new ForbiddenException({
    customMessage,
    code: responseCodes.FORBIDDEN,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
  })
}

export class CustomError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'CustomError';
  }
}


// HTTP CODE MAPPING

export function mapErrorCodeToHttpResponse(data: ServiceResponse): CustomHttpResponse {
  const { code, body, message } = data
  switch (code) {
    case errorCodes.SUCCESS:
      return {
        customMessage: message,
        statusCode: responseCodes.SUCCESS,
        message: responseMessages.SUCCESS,
        body: body,
      };
    case errorCodes.BAD_REQUEST:
      return {
        customMessage: message,
        statusCode: responseCodes.INVALID_REQUEST,
        message: responseMessages.INVALID_REQUEST,
        body: body,
      };
    case errorCodes.UNAUTHORIZED:
      return {
        customMessage: message,
        statusCode: responseCodes.UNAUTHORIZED,
        message: responseMessages.UNAUTHORIZED,
        body: body,
      };
    case errorCodes.NOT_FOUND:
      return {
        customMessage: message,
        statusCode: responseCodes.NOT_FOUND,
        message: responseMessages.NOT_FOUND,
        body: body,
      };
    case errorCodes.EXCEPTION:
      return {
        customMessage: message,
        statusCode: responseCodes.EXCEPTION,
        message: responseMessages.EXCEPTION,
        body: body,
      };
    case errorCodes.FORBIDDEN:
      return {
        customMessage: message,
        statusCode: responseCodes.FORBIDDEN,
        message: responseMessages.FORBIDDEN,
        body: body,
      };
    default:
      return {
        customMessage: message,
        statusCode: responseCodes.EXCEPTION,
        message: responseMessages.EXCEPTION,
        body: body,
      };
  }
}