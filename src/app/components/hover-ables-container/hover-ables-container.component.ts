import { Component, Input } from '@angular/core';
import { GanaHoverAblesComponent } from '../gana-hover-ables/gana-hover-ables.component';
import { KanjiHoverAblesComponent } from '../kanji-hover-ables/kanji-hover-ables.component';

@Component({
  selector: 'app-hover-ables-container',
  standalone: true,
  imports: [GanaHoverAblesComponent,KanjiHoverAblesComponent],
  template: `
    @for (char of text; track $index) {
      @if (char.match('[\u3040-\u30ff]')?.length) {
        <app-gana-hover-ables [text]="char"></app-gana-hover-ables>
      } @else if (char.match('[\u4e00-\u9faf]')?.length) {
        <app-kanji-hover-ables [text]="char"></app-kanji-hover-ables>
      } @else {
        <span>{{char}}</span>
      }
    }
  `,
  styles: ``
})
export class HoverAblesContainerComponent {
  @Input() text:string=""
}
