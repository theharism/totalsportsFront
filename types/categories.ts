export interface Category {
    _id: string;
    name: string;
    logo: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    isTopCategory: boolean;
    topOrder: number;
}