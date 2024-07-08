class ApiError extends Error {
    constructor(
        status, 
        message="An error occured", 
        errors=[],
        stack=""
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.stack = stack;
        this.success = false;
        this.data = null;
    
        if(stack) {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}