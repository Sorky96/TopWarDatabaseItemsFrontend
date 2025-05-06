export interface ItemAttribute {
  id: number;
  attributeType: string;
  attributeValue: string;
  itemId: number;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  attributes: ItemAttribute[];
}