import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { KatakanaHiragana } from '../../Types/katakana-hiragana.dictionary';

@Component({
  selector: 'app-gana-hover-ables',
  standalone: true,
  imports: [],
  template: `
    <span (mouseenter)="ShowPopoverOnHoverEnter($event)" (mouseleave)="ShowPopoverOnHoverExit($event)">{{text}}</span>

    <div #mypopover id='mypopover' popover>Romanji reading: {{romanjiReading}}</div>
  `,
  styles: [
    '[popover] { margin:0; }',
    'span:hover { background:#0000001f; }'
  ]
})
export class GanaHoverAblesComponent {
  romanjiReading:string = '';

  @Input() text:string = "";
  @ViewChild('mypopover') popover : ElementRef<HTMLElement> | undefined;

  ShowPopoverOnHoverEnter(event:MouseEvent) {
    if (!this.popover) return;

    this.popover!.nativeElement.style.top = `${(event.target as HTMLElement).getBoundingClientRect().y + (event.target as HTMLElement).getBoundingClientRect().height}px`;
    this.popover!.nativeElement.style.left = `${(event.target as HTMLElement).getBoundingClientRect().x}px`;
    this.romanjiReading = KatakanaHiragana.syllabary[this.text]?.romanji ?? 'Not in dataset';

    this.popover!.nativeElement.showPopover();
  }

  ShowPopoverOnHoverExit(event:MouseEvent) {
    this.popover?.nativeElement.hidePopover();
  }
}
