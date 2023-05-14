export interface News {
    data: [{
        news: string,
        url: string,
        type?: string,
        image?: string,
        last_updated_time?: string
    }];
    success: boolean;
    message?: string;
}
