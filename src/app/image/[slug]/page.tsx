'use client';

import { usePathname } from "next/navigation";
import Link from 'next/link';
// import Image from 'next/image';

import useGetSearchData from "@/app/_hooks/useGetSearchData";

export default function ImagesListPage() {
    const searchParams = usePathname()
    const slug = searchParams.split("=").pop() || '';
    const {data, loading, error} = useGetSearchData({slug, type: 'image'});
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // TODO: possible redirect to 404 page
    if (!slug || data?.results.length === 0) {
        return null;
    }
    
    return <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {data && (
            <div>
                <h1>Search Results for: {slug}</h1>
                <div className="w-full flex-col grid ">
                    {data.results.map((item) => (
                        <div key={item.id} className="border rounded m-4 p-4">
                        <Link href={`/image/item/${item.id}`}>
                            <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="hover:opacity-75 transition-opacity duration-200"
                            />
                        </Link>
                        <h2 className="product-name">{item.title}</h2>
                        </div>
                    )
                    )}
                </div>
            </div>
        )}
    </div>;
}
