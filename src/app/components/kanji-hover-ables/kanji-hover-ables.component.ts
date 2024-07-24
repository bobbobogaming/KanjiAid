import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { KatakanaHiragana } from '../../Types/katakana-hiragana.dictionary';
import { IKanjiapi } from '../../Services/Interfaces/ikanjiapi.service';
import { Kanji } from '../../Types/kanji';

@Component({
  selector: 'app-kanji-hover-ables',
  standalone: true,
  imports: [],
  template: `
    <span (mouseenter)="ShowPopoverOnHoverEnter($event)" (mouseleave)="ShowPopoverOnHoverExit($event)">{{text}}</span>

    <div #mypopover id='mypopover' popover>
      @if (kanji !== undefined){
        <p>On reading: {{kanji.on_readings.join(', ')}}</p>
        <p>Romanji On reading: {{parseGana(kanji.on_readings).join(', ')}}</p>
        <p>Kun readings: {{kanji.kun_readings.join(', ')}}</p>
        <p>Romanji Kun readings: {{parseGana(kanji.kun_readings).join(', ')}}</p>
        <p>English meaning: {{kanji.meanings.join(', ')}}</p>
      } @else {
        <p>Unknown character</p>
      }
    </div>
`,
  styles: [
    '[popover] { margin:0; }',
    'span:hover { background:#0000001f; }'
  ]
})
export class KanjiHoverAblesComponent {
  kanji:Kanji|undefined
  kanjiRomanji:{ "on_readings":string[], "kun_readings":string[] }|undefined

  @Input() text:string = "";
  @ViewChild('mypopover') popover : ElementRef<HTMLElement> | undefined;

  constructor (private kanjiApiService:IKanjiapi) {}

  async ShowPopoverOnHoverEnter(event:MouseEvent) {
    if (!this.popover) return;

    this.popover!.nativeElement.style.top = `${(event.target as HTMLElement).getBoundingClientRect().y + (event.target as HTMLElement).getBoundingClientRect().height}px`;
    this.popover!.nativeElement.style.left = `${(event.target as HTMLElement).getBoundingClientRect().x}px`;
    // this.romanjiReading = KatakanaHiragana.syllabary[this.text]?.romanji ?? 'Not in dataset';
    this.kanji = await this.kanjiApiService.GetKanjiInfo(this.text);

    this.popover!.nativeElement.showPopover();
  }

  ShowPopoverOnHoverExit(event:MouseEvent) {
    this.popover?.nativeElement.hidePopover();
  }

  parseGana(readingList:string[]):string[]{
    return readingList.map(r=>r.split('').map(g=>KatakanaHiragana.syllabary[g]?.romanji || g).join(''));
  }
}
