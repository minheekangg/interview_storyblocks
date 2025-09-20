import { useEffect, useState } from "react";
import * as crypto from 'crypto';


type StoryblocksImageResult = {
    id: number;
    title: string;
    type: string;
    contentClass: string;
    is_new: boolean;
    thumbnail_url: string;
    preview_url: string;
};

type StoryblocksResponse = {
    total_results: number;
    results: StoryblocksImageResult[];
};

const useFetchData = (url: string) => {
    const [data, setData] = useState<StoryblocksResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Provided by Storyblocks
        const publicKey = process.env.STORYBLOCK_PUBLIC_API_KEY || '';
        const privateKey = process.env.STORYBLOCK_PRIVATE_API_KEY || '';

        // url info
        const baseUrl = 'https://api.storyblocks.com';
        const resource = '/api/v2/images/search';
        // HMAC generation
        const expires = Math.floor(Date.now() / 1000) + 128900; // Current time + 36 hours in seconds
        const hmacBuilder = crypto.createHmac('sha256', privateKey + expires);
        hmacBuilder.update(resource);
        const hmac = hmacBuilder.digest('hex');

        const fetchData = async () => {
            try {
                setLoading(true);
                const requestOptions = {
                method: 'GET',
                // redirect: 'follow'
                };

                fetch(`https://api.storyblocks.com/api/v2/images/search?APIKEY=${publicKey}&EXPIRES=${expires}&HMAC=${hmac}&project_id=Storyblocks&user_id=test_user&keywords=flower&content_type=image&orientation=landscape&color=black&has_transparency=false&has_talent_released=false&has_property_released=false&is_editorial=false&categories=&page=1&results_per_page=10&sort_by=relevance&sort_order=desc&required_keywords=&filtered_keywords=&contributor_id=&safe_search=false`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log({result})
   
                    
                })
                .catch(error => console.log('error', error));
                const response = await fetch(`https://api.storyblocks.com/api/v2?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log({response})
                const result = await response.json();
                setData(result);
            } catch (error ) {
                setError(error?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        // TODO: remove mocked data and use actual fetch
        // fetchData();
        const mockedResult= {
            "total_results": 1,
            "results": [
                {
                "id": 800953,
                "title": "Deep space background with nebulae",
                "type": "photo",
                "contentClass": "image",
                "is_new": false,
                "thumbnail_url": "https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/deep-space-background-with-nebulae_r7NpVyflR_thumb.jpg",
                "preview_url": "https://d1yn1kh78jj1rr.cloudfront.net/image/preview/..."
                }
            ]
            } 
        setData(mockedResult)

       
    }, [url]);

    return { data, loading, error };

}

export default useFetchData