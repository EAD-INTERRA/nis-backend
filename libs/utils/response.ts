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
    statusCode: responseCodes.INVALID_REQUEST,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
    customMessage
  })
}

export function unauthorized(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new UnauthorizedException({
    code: responseCodes.UNAUTHORIZED,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
    customMessage
  })
}

export function notFound(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new NotFoundException({
    code: responseCodes.NOT_FOUND,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
    customMessage
  })
}

export function exception(data: CustomHttpResponse | Error) {
  if (data instanceof Error) {
    throw data; // Just throw the native error
  }

  const { message, customMessage, ...rest } = data
  throw new InternalServerErrorException({
    code: responseCodes.EXCEPTION,
    body: null,
    message,
    error: 
    // extractMeaningfulError(
      message?.stack,
    // ) 
    // || 
    // JSON.stringify(message, null, 2),
    customMessage
  })
}

export function forbidden(data: CustomHttpResponse) {
  const { message, customMessage, ...rest } = data
  throw new ForbiddenException({
    code: responseCodes.FORBIDDEN,
    body: null,
    message,
    error: extractMeaningfulError(message?.stack) || JSON.stringify(message, null, 2),
    customMessage
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
        statusCode: responseCodes.SUCCESS,
        message: responseMessages.SUCCESS,
        body: body,
        customMessage: message
      };
    case errorCodes.BAD_REQUEST:
      return {
        statusCode: responseCodes.INVALID_REQUEST,
        message: responseMessages.INVALID_REQUEST,
        body: body,
        customMessage: message
      };
    case errorCodes.UNAUTHORIZED:
      return {
        statusCode: responseCodes.UNAUTHORIZED,
        message: responseMessages.UNAUTHORIZED,
        body: body,
        customMessage: message
      };
    case errorCodes.NOT_FOUND:
      return {
        statusCode: responseCodes.NOT_FOUND,
        message: responseMessages.NOT_FOUND,
        body: body,
        customMessage: message
      };
    case errorCodes.EXCEPTION:
      return {
        statusCode: responseCodes.EXCEPTION,
        message: responseMessages.EXCEPTION,
        body: body,
        customMessage: message
      };
    case errorCodes.FORBIDDEN:
      return {
        statusCode: responseCodes.FORBIDDEN,
        message: responseMessages.FORBIDDEN,
        body: body,
        customMessage: message
      };
    default:
      return {
        statusCode: responseCodes.EXCEPTION,
        message: responseMessages.EXCEPTION,
        body: body,
        customMessage: message
      };
  }
}