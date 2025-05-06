import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/edit/:id', component: ItemFormComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }