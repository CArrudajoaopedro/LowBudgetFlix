export class AppError extends Error
{
    public readonly statusCode: number;
    public readonly code: string;

    constructor(message: string, statusCode: number = 400, code: string = "BAD_REQUEST")
    {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype)
    };
}
export class BadRequestError extends AppError
{
    constructor(message: string)
    {
        super(message, 400, "BAD_REQUEST");
    }
}
export class UnauthorizedError extends AppError
{
    constructor(message: string)
    {
        super(message, 401, "UNAUTHORIZED");
    }
}
export class ForbiddenError extends AppError
{
    constructor(message: string)
    {
        super(message, 403, "FORBIDDEN");
    }
}
export class NotFoundError extends AppError
{
    constructor(message: string)
    {
        super(message, 404, "NOT_FOUND");
    }
}
export class UnprocessableEntityError extends AppError
{
    constructor(message: string)
    {
        super(message, 422, "UNPROCESSABLE_ENTITY");
    }
}
