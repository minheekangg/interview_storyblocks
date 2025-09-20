'use client';

import { usePathname } from "next/navigation";

import useGetItemData from "@/app/_hooks/useGetItemData";

export default function ImagePage() {
    const searchParams = usePathname()
    const {data, loading, error} = useGetItemData({type: 'image', id: searchParams.split("/").pop() || ''});
    console.log({searchParams, data})

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // TODO: possible redirect to 404 page
    if (!data) return null;

    return <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <img
        src={data.thumbnail_url}
        alt={data.title}
        width={300}
        height={300}
        className="hover:opacity-75 transition-opacity duration-200" 
        />
        <h2 className="product-name">{data.title}</h2>
        <p>{data.description}</p>
        <p>Content Id: {data.content_id}</p>
    </div>;
}