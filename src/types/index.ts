export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  portfolio_url: string | null;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface UnsplashPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string | null;
  description: string | null;
  alt_description: string | null;
  urls: UnsplashPhotoUrls;
  user: UnsplashUser;
  likes: number;
  [key: string]:  string | number | boolean | null | undefined | object;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

