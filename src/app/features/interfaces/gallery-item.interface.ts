export interface GalleryItem{
    id: string;
    url: string;
    comments: Comment[];
}

export interface Comment{
    id: string;
    comment: string;
}