import axios from "axios";
import type { UnsplashSearchResponse, UnsplashPhoto } from "../types";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const unsplashAPI = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query: string, page: number = 1): Promise<UnsplashSearchResponse> => {
  const res = await unsplashAPI.get("/search/photos", {
    params: { query, page, per_page: 20 },
  });
  return res.data;
};

export const listPhotos = async (page: number = 1): Promise<UnsplashPhoto[]> => {
  const res = await unsplashAPI.get("/photos", {
    params: { page, per_page: 20 },
  });
  return res.data;
};

export const getPhoto = async (id: string): Promise<UnsplashPhoto> => {
  const res = await unsplashAPI.get(`/photos/${id}`);
  return res.data;
};
