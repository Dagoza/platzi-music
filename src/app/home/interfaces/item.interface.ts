import { ItemType } from "src/app/shared/enums/ItemType.enum";

export interface Item{
  artists: any[];
  external_urls: object;
  href: string;
  id: string;
  images: any[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number
  album_type: ItemType;
  uri: string;
}

