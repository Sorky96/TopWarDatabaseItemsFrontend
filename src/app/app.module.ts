import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { ItemListComponent } from './item-list/item-list.component';

const appRoutes: Routes = [
  { path: '', component: ItemListComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, // Ensure HttpClientModule is imported
    RouterModule.forRoot(appRoutes)
  ],
})
export class AppModule { }