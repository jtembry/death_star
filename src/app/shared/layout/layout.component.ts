import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'pm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {
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
