import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuoteModule } from './quotes/quote.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { SharedModule } from './shared/shared.module';
import {MaterialImports} from './shared/material-exports';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    QuoteModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
