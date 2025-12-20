export interface ContentItemDto {
    id: number;
    title: string;
    jlptLevel: string;
    topic: string;
    createdAt: string;
}

export interface ContentListResponseDto {
    contents: ContentItemDto[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    first: boolean;
    last: boolean;
}
