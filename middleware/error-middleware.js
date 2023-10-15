import ApiError from "../exceptions/api-error.js";

export default function errorMiddleware (err, request, response, next) {
    console.log(err);
    if(err instanceof ApiError) {
        return response.status(err.status).json({message: err.message, errors: err.errors});
    }
    return response.status(500).json({message: 'Unexpected error'});
}