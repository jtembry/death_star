import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { QuoteListComponent } from './quote-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { MaterialsModule} from '../shared/material.module';

const appRoutes: Routes = [
  {  path: 'quotes', component: QuoteListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
      ),
    SharedModule,
    MaterialsModule
  ],
  declarations: [
    QuoteListComponent,
    ConvertToSpacesPipe,
  ]
})
export class QuoteModule { }
