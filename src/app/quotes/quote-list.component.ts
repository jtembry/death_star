import { Component, OnInit } from '@angular/core';
import { IQuote } from './quote';

import { QuoteService } from './quote.service';

@Component({
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  pageTitle = 'Quote List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredQuotes = this.listFilter ? this.performFilter(this.listFilter) : this.quotes;
  }

  filteredQuotes: IQuote[] = [];
  quotes: IQuote[] = [];

  constructor(private quoteService: QuoteService) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Quote List: ' + message;
  }

  performFilter(filterBy: string): IQuote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quotes.filter((quote: IQuote) =>
      quote.meat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe(
      quotes => {
        this.quotes = quotes;
        this.filteredQuotes = this.quotes;
      },
      error => this.errorMessage = <any>error
    );
  }
}
