import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { MaterialImports } from './material-exports';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
      CommonModule,
  ],
  declarations: [
      StarComponent,
  ],
  exports: [
      StarComponent,
      CommonModule,
      FormsModule,
  ]
})
export class SharedModule { }
