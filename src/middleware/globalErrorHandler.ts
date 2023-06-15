/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import ApiError from '../errors/ApiError';
import { handleValidationError } from '../errors/handleValidationError';
import { IGenericErrorMessage } from '../interface/error';
import { errorlogger } from '../shared/logger';

const globalErrorHandler : ErrorRequestHandler = (err, req, res, next) =>{

    config.env === 'development' ? console.log('globalErrorHandler',err) :
    errorlogger.error('globalErrorHandler',err)

    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages:IGenericErrorMessage[] = [];

    if(err?.name === 'ValidationError'){
        const simplified = handleValidationError(err)
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorMessages = simplified.errorMessages;
    }else if(err instanceof ApiError){
        message = err?.message
        errorMessages = err?.message ? 
        [
            {
                path:'',
                message:err?.message
            }
        ] : [] 
    }else if(err instanceof Error){
        message = err?.message
        errorMessages = err?.message ? 
        [
            {
                path:'',
                message:err?.message
            }
        ] : []
    }

    res.status(statusCode).json({
        success:false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? err?.stack : undefined
    })
    next()
}

export default globalErrorHandler;