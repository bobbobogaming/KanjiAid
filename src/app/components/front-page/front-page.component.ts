import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RomajiInputComponent } from '../romaji-input/romaji-input.component';
import { HoverAblesContainerComponent } from '../hover-ables-container/hover-ables-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [MatButtonModule, RomajiInputComponent,HoverAblesContainerComponent,FormsModule],
  template: `
    <!-- <p>
      front-page works!
      <span (mouseenter)="ShowPopoverOnHoverEnter($event)" (mouseleave)="ShowPopoverOnHoverExit($event)">Hover me</span>
    </p>
    <app-romaji-input></app-romaji-input>
    <button mat-raised-button popovertarget='mypopover'>Show popover</button>
    <div #mypopover id='mypopover' popover>popover</div>
    <input type="text" [(ngModel)]="text">
    <p><app-hover-ables-container [text]="text"></app-hover-ables-container></p> -->
    <h1>Welcome to KanjiAid</h1>
    <p>KanjiAid is a website developed to help with learning kanji.</p>
    <div>
      <h2>Features</h2>
      <h3>Provided features</h3>
      <p>The website provides a page where a user can input a log of text and then hover over any character they are uncertain about the reading or meaning of. When a character is hovered over a card showing information about that character is shown.</p>
      <p>The website also has a kanji dictionary. (Logography)</p>
      <h3>Planed features</h3>
      <p>A sort of quiz game is planned for the website.</p>
      <p>Some pages will likely be reworked to work better.</p>
      <p>More work is planned to make the website more mobile friendly.</p>
      <p>The website is set up like if it was a PWA (a downloadable app), this is a untested feature an will hopefully become fully working at some point.</p>
      <h2>A disclaimer</h2>
      <p>This website is unfortunately developed without a great deal of knowledge about the Japanese writing system, tho still a none 0 amount. A such mistakes and oversights are likely to be present.</p>
      <h2>Data</h2>
      <p>Most data is sources with kanjiapi.dev</p>
      <a href="https://kanjiapi.dev">Click here to find out more about kanjiapi.dev</a>
    </div>

  `,
  styles: [
    ':host { display:flex; flex-direction:column; align-items:center; }',
    '[popover] { margin:0; }',
    'span:hover { background:#0000001f; }'
  ]
})
export class FrontPageComponent {
  @ViewChild('mypopover') popover : ElementRef<HTMLElement> | undefined

  text:string = ''
  ShowPopoverOnHoverEnter(event:MouseEvent) {
    if (!this.popover) return;

    this.popover!.nativeElement.style.top = `${(event.target as HTMLElement).getBoundingClientRect().y}px`;
    this.popover!.nativeElement.style.left = `${(event.target as HTMLElement).getBoundingClientRect().x + (event.target as HTMLElement).getBoundingClientRect().width}px`;
    this.popover!.nativeElement.showPopover();
  }

  ShowPopoverOnHoverExit(event:MouseEvent) {
    this.popover?.nativeElement.hidePopover();
  }

}
