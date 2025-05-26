import { useState } from "react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { listPhotos, searchPhotos } from "../api/unsplash";
import ImageCard from "../components/ImageCard";
import SearchBar from "../components/SearchBar";
import type { UnsplashPhoto } from "../types";

export default function Home() {
  const [query, setQuery] = useState("");

  
  const fetchPhotos = async ({ pageParam = 1 }): Promise<UnsplashPhoto[]> => {
    const data = query
      ? await searchPhotos(query, pageParam)
      : await listPhotos(pageParam);

    return "results" in data ? data.results : data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<UnsplashPhoto[]>({
    queryKey: ["photos", query],
    queryFn: fetchPhotos,
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
    staleTime: 1000 * 60 * 5,
  });

  
  const handleSearch = (q: string) => {
    setQuery(q);
    refetch(); 
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Unsplash Gallery</h1>

        <SearchBar setQuery={handleSearch} />

        {isLoading && <p className="text-center text-lg text-gray-500">Loading...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data?.pages.flat().map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>

        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}


