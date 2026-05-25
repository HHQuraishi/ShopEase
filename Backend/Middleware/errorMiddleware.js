class AppError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || res.statusCode || 500;
    let message = err.message;
    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404;
        message = "Resource not found - Wrong ID format!";
    }
    if(err.code === 11000){
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists!`;  
    }
    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }
    if(err.name === "JsonWebTokenError"){
        statusCode = 401;
        message = "Invalid Token! Login Again!";
    }
    if(err.name === "TokenExpiredError"){
        statusCode = 401;
        message = "Token Expired! Login Again!";
    }
    res.status(statusCode).json({ success: false, message, stack: process.env.NODE_ENV === 'development'? err.stack:undefined });
};

const notFound = (req,res,next) => {
    const error = new AppError(`Route not found: ${req.originalUrl}`,404);
    next(Error);
};

module.exports = { notFound, errorHandler, AppError };