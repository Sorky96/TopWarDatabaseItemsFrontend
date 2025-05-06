import { ItemAttribute } from "./ItemAttribute";

export interface Item {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    attributes: ItemAttribute[];
  }