import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavContainer, MatSidenavContent, MatSidenav, MatButtonModule],
  template: `
    <!-- <mat-sidenav-container>
      <mat-sidenav #sideNav mode="over">Start</mat-sidenav>
      <mat-sidenav-content>
        <div>
          <h1>Welcome to {{title}}!</h1>
          
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <button mat-button (click)="sideNav.toggle()">Open</button> -->
    <nav #navbar id="navbar">
      <!-- <nav id="navbar" class="open-navbar"> -->
        <button mat-icon-button (click)="handleOpenCloseNavbar()">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
           <path d="m10 10l80 0m-80 40l80 0m-80 40l80 0" stroke="white" stroke-width="10" fill="none" stroke-linecap="round">
             <animate #animateClose attributeName="d" 
             from="m10 10l80 0m-80 40l80 0m-80 40l80 0"
             to="m10 10l80 80m-40 -40l0 0m-40 40l80 -80"
             dur="1s"
             fill="freeze"
             begin="indefinite"/>
             <animate #animateOpen attributeName="d" 
             from="m10 10l80 80m-40 -40l0 0m-40 40l80 -80"
             to="m10 10l80 0m-80 40l80 0m-80 40l80 0"
             dur="1s"
             fill="freeze"
             begin="indefinite"/>
           </path>
          </svg>
        </button>
        <ul>
          <li><a routerLink="/" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/paragraph" routerLinkActive="active">Paragraph Helper</a></li>
          <li><a routerLink="/quiz" routerLinkActive="active">Quiz</a></li>
          <li><a routerLink="/logography" routerLinkActive="active">Logography</a></li>
        </ul>
      </nav>
    <div id="content">
      <!-- <h1>Welcome to {{title}}!</h1> -->
      <!-- <img src="/images/KanjiDictionary.svg" alt=""> -->
      <router-outlet />
    </div>
    `,
  styles: [
    'mat-sidenav-container { height: 100%; }',
    '@media screen and (min-width:700px) { nav#navbar { position: fixed; z-index: 4; height: 100%; top: 0; left: 0; width: 3.5rem; transition: width 2s; border-radius: 0 1rem 1rem 0; background: #dd2222; box-shadow: 0 0 2px; } }',
    '@media screen and (min-width:700px) { nav.open-navbar { width: 12rem!important; } }',
    '@media screen and (max-width:700px) { nav#navbar { position: inherit; height: 4rem; width:100%; transition: height 2s; border-radius: 0 0 1rem 1rem; background: #dd2222; box-shadow: 0 0 2px; overflow: hidden} }',
    '@media screen and (max-width:700px) { nav.open-navbar { height: calc(4rem + (3.5rem * 4))!important; } }',
    'div#content { display: flex; align-content: center; align-items: center; flex-direction: column; flex-wrap: wrap; }',
    'button { margin-top:1rem; margin-left:.5rem; display:flex; align-items:center; justify-content:center; }',
    'ul { list-style:none; padding:inherit; }',
    'li { overflow:hidden; text-wrap:nowrap; }',
    'a { text-decoration:none; color:white; display:inline-block; width:100%; margin:.25rem 0; padding:.25rem 0; }',
    'a:hover { background: #0000001f }',
    'a::before { font-size: x-large; font-weight:bold; padding:0 1rem; }',
    'li:nth-child(1)>a::before { content:"家";}',
    'li:nth-child(2)>a::before { content:"章";}',
    'li:nth-child(3)>a::before { content:"問";}',
    'li:nth-child(4)>a::before { content:"字";}',
    'svg { width:1.5rem; height:1.5rem; }',
    '#content>* {max-width:50rem}'
  ],
})
export class AppComponent {
  title = 'KanjiAid';
  @ViewChild('animateClose') animateClose: ElementRef<SVGAnimateElement> | undefined
  @ViewChild('animateOpen') animateOpen: ElementRef<SVGAnimateElement> | undefined
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> | undefined
  
  navbarOpened:boolean = false

  handleOpenCloseNavbar() {
    if (this.navbarOpened) {
      this.navbar!.nativeElement.className="";
      this.animateOpen?.nativeElement.beginElement();
    } else {
      this.navbar!.nativeElement.className="open-navbar";
      this.animateClose?.nativeElement.beginElement();
    }
    this.navbarOpened = !this.navbarOpened;
  }
}
