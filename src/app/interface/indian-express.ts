export interface News {
    data: [{
        heading: string,
        link: string,
        type?: string,
        shortDescription?: string
    }];
    success: boolean;
    type: string;
}
