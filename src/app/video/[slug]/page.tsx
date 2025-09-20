'use client';
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";

export default function VideoPage() {
    const searchParams = usePathname()
    const {data, loading, error} = useFetchData(searchParams);
    console.log({searchParams, data})
    // Extract the slug from the URL
    const slug = searchParams.split("=").pop();

    useEffect(() => {
        console.log("Slug:", slug);
    }, [slug]);

    if (!slug || data?.results.length === 0) {
        return null;
    }
    
    return <div>
        {data && (
            <div>
                <h1>Search Results for "{slug}"</h1>
                <ul>
                    {data.results.map((item) => (
                        <li key={item.id}>
                            <h2>{item.title}</h2>
                            <img src={item.thumbnail_url} alt={item.title} />
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>;
}
