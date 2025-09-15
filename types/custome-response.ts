export class CustomResponse {
    success: boolean;
    message: string;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message
    }

    toObject() {
        return {...this}
    }
}

export class SuccessResponse<T= unknown> extends CustomResponse {
    data: T;

    constructor(message: string, data: T) {
        super(true, message);
        this.data = data;
    }
}

export class FailResponse<T = unknown> extends CustomResponse {
    error?: T;

    constructor(message: string, error?: T) {
        super(false, message);
        this.error = error;
    }
}