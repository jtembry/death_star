import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { environment } from '../environments/environment';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sideNav: MatDrawer;
  buttonDisplay: string;
  pageTitle: string;

  ngOnInit(): void {
    this.buttonDisplay = 'menu';
    this.pageTitle = 'Web_Solutions';
  }

  ngAfterViewInit(): void {
    this.sideNav.closedStart.subscribe(() => {
      this.buttonDisplay = 'menu';
    });
    this.sideNav.openedStart.subscribe(() => {
      this.buttonDisplay = 'close';
    });

  }

  toggle() {
    this.sideNav.toggle();


    console.log('TEST');
  }
}
