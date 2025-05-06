import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../../models';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  attributeFilter: string = '';
  sortByValue: boolean = false;
  searchQuery: string = '';
  limit: number = 20; // Default limit

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(query: string = '', attributeFilter: string = '', sortByValue: boolean = false, limit: number = 20): void {
    this.itemService.getItems(query, attributeFilter, sortByValue).subscribe({
      next: (data) => {
        this.items = data.slice(0, limit); // Apply the limit here
      },
      error: (err) => {
        console.error('Error fetching items', err);
      }
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.attributeFilter = selectElement.value;
  }

  onSortChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.sortByValue = inputElement.checked;
  }

  onSearchButtonClick(): void {
    this.fetchItems(this.searchQuery, this.attributeFilter, this.sortByValue, this.limit);
  }

  onLimitChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.limit = parseInt(inputElement.value, 10) || 20; // Default to 20 if invalid
  }
}