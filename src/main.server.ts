import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { ItemListComponent } from './app/item-list/item-list.component';

const bootstrap = () => bootstrapApplication(ItemListComponent, config);

export default bootstrap;
