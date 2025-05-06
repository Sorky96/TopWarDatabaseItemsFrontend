import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5000/api/items'; // Adjust the URL based on your API setup

  constructor(private http: HttpClient) {}

  getItems(search: string = '', attributeFilter: string = '', sortByValue: boolean = false): Observable<Item[]> {
    let params = `?search=${search}&attributeFilter=${attributeFilter}&sortByValue=${sortByValue}`;
    return this.http.get<any>(`${this.apiUrl}${params}`).pipe(
      map(response => this.transformItems(response.$values))
    );
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${item.id}`, item);
  }

  private transformItems(data: any[]): Item[] {
    return data.map(item => ({
      id: item.id,
      name: item.name.replace(/([A-Z])/g, ' $1').trim(),
      description: item.description,
      imageUrl: item.imageUrl,
      attributes: item.attributes.$values.map((attr: any) => ({
        id: attr.id,
        attributeType: attr.attributeType,
        attributeValue: attr.attributeValue,
        itemId: attr.itemId
      }))
    }));
  }
}