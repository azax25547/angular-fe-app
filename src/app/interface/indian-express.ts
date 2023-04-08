export interface News {
    data: [{
        news: string,
        url: string,
        type?: string
    }];
    success: boolean;
    message?: string;
}
