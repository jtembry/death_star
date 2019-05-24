import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { MaterialImports } from './material-exports';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
      CommonModule,
    MaterialImports,
    HttpClientModule,
    AppRoutingModule
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
