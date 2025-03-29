import { Component, AfterContentInit } from '@angular/core';
import { IKanjiapi } from '../../Services/Interfaces/ikanjiapi.service';
import { KanjiList } from '../../Types/kanji-list';
import { Kanji } from '../../Types/kanji';
import { HoverAblesContainerComponent } from '../hover-ables-container/hover-ables-container.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-logography',
  standalone: true,
  imports: [HoverAblesContainerComponent, MatTab, MatTabGroup],
  template: `
    <h1>Logography of Kanji</h1>
    <mat-tab-group (selectedIndexChange)="handleTabChanged($event)">
      <mat-tab label="Grade-1"></mat-tab>
      <mat-tab label="Grade-2"></mat-tab>
      <mat-tab label="Grade-3"></mat-tab>
      <mat-tab label="Grade-4"></mat-tab>
      <mat-tab label="Grade-5"></mat-tab>
      <mat-tab label="Grade-6"></mat-tab>
      <mat-tab label="Grade-8"></mat-tab>
    </mat-tab-group>
    @for (item of kanjiList?.kanji; track $index) {
      <details (toggle)="getKanjiInfo(item,$event)">
        <summary><h1>{{item}}</h1></summary>
        @if (kanjiInfo[item] !== undefined){
          <!-- <p>{{kanjiInfo[item].unicode}}</p> -->
          <!-- <p>{{kanjiInfo[item].on_readings.join(', ')}}</p> -->
          <p>On readings: <app-hover-ables-container [text]="kanjiInfo[item].on_readings.join(', ')"/></p>
          <!-- <p>{{kanjiInfo[item].kun_readings.join(', ')}}</p> -->
          <p>Kun readings: <app-hover-ables-container [text]="kanjiInfo[item].kun_readings.join(', ')"/></p>
          <p>English meaning: {{kanjiInfo[item].meanings.join(', ')}}</p>
        }
      </details>
    }
  `,
  styles: [
    ':host { display:flex; flex-direction:column; align-items:center; }',
    'summary { list-style:none; cursor:pointer; text-align:center; }',
    'mat-tab-group { max-width:100vw; }'
  ]
})
export class LogographyComponent implements AfterContentInit {
  kanjiList: KanjiList | undefined
  kanjiInfo: {[key:string]: Kanji} = {}
  constructor (private kanjiApiService:IKanjiapi) {}

  async ngAfterContentInit(): Promise<void> {
    let kanji = await this.kanjiApiService.GetKanjiByGrade(1);
    this.kanjiList = kanji;
  }

  async getKanjiInfo(kanji:string,event:Event): Promise<void> {
    if ((event as ToggleEvent).newState == "closed") { return; }
    let kanjiInfo = await this.kanjiApiService.GetKanjiInfo(kanji);
    this.kanjiInfo[kanji] = kanjiInfo;
  }

  async handleTabChanged(newIndex:number): Promise<void> {
    if (newIndex == 6) newIndex++;
    let kanji = await this.kanjiApiService.GetKanjiByGrade(newIndex + 1);
    this.kanjiList = kanji;
  }
}
