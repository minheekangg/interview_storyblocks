'use client'

import { useEffect, useState } from "react";

import { config } from "./apiConfig"
import { ContentType, StoryblocksImageDetail } from "./types";

const useGetItemData = ({ id, type }: { id: string; type: ContentType }) => {
    const [data, setData] = useState<StoryblocksImageDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const { APIKEY, EXPIRES, HMAC } = config;
            const result = await fetch(`https://api.storyblocks.com/api/v2/${type}/stock-item/details/${id}?APIKEY=${APIKEY}&EXPIRES=${EXPIRES}&HMAC=${HMAC}&user_id=test_user&project_id=Storyblocks`, { method: 'GET' });
            if (!result.ok) {
                setError('Network response was not ok');
                setLoading(false);
                return;
            }
            const data = await result.json();
            setData(data);
        };
        // TODO: remove mocked data and use actual fetch
        // fetchData();

        const mockedResult: StoryblocksImageDetail = {
            "id": 100,
            "title": "Vector Price Tags",
            "type": "Vector",
            "contentClass": "image",
            "is_new": false,
            "thumbnail_url": "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/vvv-0216-img_2174-2-3165_thumb.jpg",
            "preview_url": "https://d1yn1kh78jj1rr.cloudfront.net/image/preview/...",
            "small_preview_url": "https://d1yn1kh78jj1rr.cloudfront.net/image/preview/...",
            "download_formats": {
                "JPG": {
                "format_name": "JPG",
                "file_size_bytes": 1385263,
                "height": 2239,
                "width": 3000
                }
            },
            "categories": [
                "business"
            ],
            "keywords": [
                "art",
                "barcode",
                "sale"
            ],
            "description": "Vector Price Tags. Four Elegant Vector Price Tags With Sample Barcodes (red, Blue And Black Tags) Two With Red Bow. Download File: Pdf Vector",
            "expiration_date": null,
            "content_id": 3000949,
            "url_id": "vector-price-tags-hgfyeqo-jlv8",
            "asset_id": "SBI-3000949",
            "aspect_ratio": 1.38748,
            "is_editorial": false,
            "has_talent_released": false,
            "has_property_released": false
        }
        setData(mockedResult)
        setLoading(false)
    }, [id, type]);

    return { data, loading, error };

}

export default useGetItemData