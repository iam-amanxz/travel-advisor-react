export type Coord = {
  lat: number;
  lng: number;
};

export type Bound = {
  sw: Coord;
  ne: Coord;
};

export interface Place {
  name: string;
  num_reviews: string;
  price_level: string;
  ranking: string;
  latitude: string;
  longitude: string;
  web_url: string;
  website: string;
  awards?: {
    display_name?: string;
    images?: { small: string };
  }[];
  cuisine?: { name: string }[];
  address?: string;
  phone?: string;
  photo?: { images: { large: { url: string } } };
  rating?: number;
}

export type GridRefType =
  | ((instance: HTMLDivElement | null) => void)
  | React.RefObject<HTMLDivElement>
  | null
  | undefined;
