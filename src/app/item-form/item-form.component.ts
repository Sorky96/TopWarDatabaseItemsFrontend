import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../../models';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  item: Item = { id: 0, name: '', description: '', imageUrl: '', attributes: [] };
  isEditMode: boolean = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.isEditMode = true;
      this.itemService.getItem(Number(itemId)).subscribe({
        next: (data) => {
          this.item = data;
        },
        error: (err) => {
          console.error('Error fetching item', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.itemService.updateItem(this.item).subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Error updating item', err);
        }
      });
    } else {
      this.itemService.createItem(this.item).subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Error creating item', err);
        }
      });
    }
  }

  addAttribute(): void {
    this.item.attributes.push({ id: 0, attributeType: '', attributeValue: '', itemId: this.item.id });
  }

  removeAttribute(index: number): void {
    this.item.attributes.splice(index, 1);
  }
}