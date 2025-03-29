import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KatakanaHiragana } from '../../Types/katakana-hiragana.dictionary';

@Component({
  selector: 'app-romaji-input',
  standalone: true,
  imports: [ FormsModule ],
  template: `
    <!-- <input type="text" [value]="value" (keypress)="handleKeyPress($event)"> -->
    <input type="text" [(ngModel)]="value" (keyup)="handleKeyPress($event)" (keydown)="handleSelection($event)">
    <div #mypopover id='mypopover' popover>
      @for (item of options; track $index) {
        <p>{{item}}</p>
      }
    </div>
  `,
  styles: [
    '[popover] { margin:0; }',
    '#selected-option { background:#0000001f }'
  ]
})
export class RomajiInputComponent {
  @Input() value:string = ""
  @Output() valueChange = new EventEmitter<string>()

  @ViewChild('mypopover') popover : ElementRef<HTMLElement> | undefined;

  options:string[] = [];
  selectedOptionIndex: number = 0;
  
  handleKeyPress(event:Event) {
    this.valueChange.emit(this.value);
    this.options = Object.keys(KatakanaHiragana.syllabary).filter(i=>KatakanaHiragana.syllabary[i].romanji.startsWith(this.value.match(/[a-zA-Z]+$/)?.[0]||''))
    if (!this.value.match(/[a-zA-Z]+$/)?.length) { this.options = []; }
    if (!this.options.length) { 
      this.selectedOptionIndex = 0;
      this.popover?.nativeElement.hidePopover();
      return;
    }
    
    this.popover!.nativeElement.style.top = `${(event.target as HTMLElement).getBoundingClientRect().y + (event.target as HTMLElement).getBoundingClientRect().height}px`;
    this.popover!.nativeElement.style.left = `${(event.target as HTMLElement).getBoundingClientRect().x}px`;

    if (this.popover!.nativeElement.querySelector('#selected-option')) {
      this.popover!.nativeElement.querySelector('#selected-option')!.id = '';
    }
    
    if (this.popover!.nativeElement.children[this.selectedOptionIndex]) {
      this.popover!.nativeElement.children[this.selectedOptionIndex].id = 'selected-option';
    }

    this.popover?.nativeElement.showPopover();
  }

  handleSelection(event:Event) {
    if ((event as KeyboardEvent).code =='ArrowUp') { 
      event.preventDefault();
      this.selectedOptionIndex = (this.selectedOptionIndex - 1 + this.options.length) % this.options.length;
      return;
    }
    if ((event as KeyboardEvent).code =='ArrowDown') { 
      event.preventDefault();
      this.selectedOptionIndex = (this.selectedOptionIndex + 1 + this.options.length) % this.options.length;
      return;
    }
    if (((event as KeyboardEvent).code =='Space' || (event as KeyboardEvent).code =='Enter') && this.popover?.nativeElement.querySelector('#selected-option')?.textContent) {
      event.preventDefault();
      this.value = this.value.replace(/[a-zA-Z]+$/,this.popover!.nativeElement.querySelector('#selected-option')!.textContent || '')
      this.valueChange.emit(this.value);
    }
  }
}
