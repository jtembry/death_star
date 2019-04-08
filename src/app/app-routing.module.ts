import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VisualizerComponent} from './visualizer/visualizer.component';
import {QuoteListComponent} from './quotes/quote-list.component';

const routes: Routes = [
  {path: 'welcome', component: VisualizerComponent},
  {path: 'quotes', component: QuoteListComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}