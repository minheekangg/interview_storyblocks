export type StoryblocksImageDetail = {
    id: number;
    title: string;
    type: string;
    contentClass: string;
    is_new: boolean;
    thumbnail_url: string;
    preview_url: string;
    small_preview_url: string;
    download_formats: {
        [key: string]: {
            format_name: string;
            file_size_bytes: number;
            height: number;
            width: number;
        };
    };
    categories: string[];
    keywords: string[];
    description: string;
    expiration_date: string | null;
    content_id: number;
    url_id: string;
    asset_id: string;
    aspect_ratio: number;
    is_editorial: boolean;
    has_talent_released: boolean;
    has_property_released: boolean;
}

export type StoryblocksImageResult = {
    id: number;
    title: string;
    type: string;
    contentClass: string;
    is_new: boolean;
    thumbnail_url: string;
    preview_url: string;
}

export type StoryBlocksSearchResponse = {
    total_results: number;
    // results: StoryblocksImageResult[] | StoryblocksVideoResult[] | StoryblocksAudioResult[];
    results: StoryblocksImageResult[];
}

export type StoryblocksResponse = {
    total_results: number;
    results: StoryblocksImageResult[];
};

export type ContentType = 'video' | 'image' | 'audio';