'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

type ContentType = 'video' | 'image' | 'audio';


export default function Home() {
  const router = useRouter();

  const [selected, setSelected] = useState<ContentType>('video');
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search logic here, e.g., redirect to search results page
    console.log(`Searching for ${query} in ${selected} library`);
    router.push(`/${selected}/search=${encodeURIComponent(query)}`);
  }


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>Create better video, faster than ever</div>
        <form w-full>
          <input
            type="text"
            placeholder={`Search ${selected} library`}
            className="border border-gray-300 rounded-md p-2 w-full=true"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Search
          </button> 
        </form>


        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={()=>setSelected('video')} className="rounded-full border border-solid border-transparent bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">Video</button>
          <button onClick={()=>setSelected('image')} className="rounded-full border border-solid border-transparent bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">Image</button>
          <button onClick={()=>setSelected('audio')} className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            >Audio</button>
        </div>
      </main>

    </div>
  );
}
