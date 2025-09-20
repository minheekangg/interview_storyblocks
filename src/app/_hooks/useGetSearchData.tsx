'use client'

import { useEffect, useState } from "react";

import { config } from "./apiConfig";
import { StoryBlocksSearchResponse, ContentType } from "./types";


const useGetSearchData = ({slug, type}: {slug: string, type: ContentType}) => {
    const [data, setData] = useState<StoryBlocksSearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const { APIKEY, EXPIRES, HMAC, project_id, user_id } = config;
            const result = await fetch(`https://api.storyblocks.com/api/v2/images/search?APIKEY=${APIKEY}&EXPIRES=${EXPIRES}&HMAC=${HMAC}&project_id=${project_id}&user_id=${user_id}&keywords=${slug}&content_type=${type}&orientation=landscape&color=black&has_transparency=false&has_talent_released=false&has_property_released=false&is_editorial=false&categories=&page=1&results_per_page=10&sort_by=relevance&sort_order=desc&required_keywords=&filtered_keywords=&contributor_id=&safe_search=false`, { method: 'GET' });
            if (!result.ok) {
                setError('Network response was not ok');
                setLoading(false);
                return;
            }
            const data = await result.json();
            setData(data);
        };
        // TODO: remove mocked data and use actual fetch
        fetchData();

        // const mockedResult: StoryBlocksSearchResponse = {
        //     "total_results": 1,
        //     "results": [
        //         {
        //         "id": 800953,
        //         "title": "Deep space background with nebulae",
        //         "type": "photo",
        //         "contentClass": "image",
        //         "is_new": false,
        //         "thumbnail_url": "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/vvv-0216-img_2174-2-3165_thumb.jpg",
        //         "preview_url": "https://dm0qx8t0i9gc9.cloudfront.net/image/preview/..."
        //         },
        //         {
        //         "id": 8009534,
        //         "title": "Deep space background with nebulae",
        //         "type": "photo",
        //         "contentClass": "image",
        //         "is_new": false,
        //         "thumbnail_url": "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/vvv-0216-img_2174-2-3165_thumb.jpg",
        //         "preview_url": "https://dm0qx8t0i9gc9.cloudfront.net/image/preview/..."
        //         },
    
        //     ]
        //     } 
        // setData(mockedResult)
        setLoading(false)
    }, [slug, type]);

    return { data, loading, error };

}

export default useGetSearchData