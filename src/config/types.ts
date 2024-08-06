export interface CreateUserResponse {
    status: boolean;
    message: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    authToken: string;
}

export interface Message {
    _id: string;
    content: string;
    username: string;
    pdf_id: string;
    user_id: string;
    query_id: string;
    isModelResponse: boolean;
    timestamp: string;
    __v: number;
}