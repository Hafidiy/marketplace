export interface IPaginated {
    meta: {
        total: number;
        page: number;
        last_page: number;
    };
}