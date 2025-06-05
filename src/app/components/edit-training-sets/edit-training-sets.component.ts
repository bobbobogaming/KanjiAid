import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HoverAblesContainerComponent } from '../hover-ables-container/hover-ables-container.component';
import { Kanji } from '../../Types/kanji';
import { IKanjiapi } from '../../Services/Interfaces/ikanjiapi.service';
import { FormsModule } from '@angular/forms';
import { KanjiTrainingSet } from '../../Types/kanji-training-set';
import { ITrainingSet } from '../../Services/Interfaces/itraining-set.service';

@Component({
  selector: 'app-edit-training-sets',
  standalone: true,
  imports: [HoverAblesContainerComponent,FormsModule],
  template: `
    <h1>New Training Sets</h1>
    <div class="gridContainer">
    <div class="gridAreaB">
      <input class="saveSets" type="submit" value="Save Sets" (click)="saveSets($event.target!)"/>
      <label style="float:right">split
        <input type="number" min="1" [(ngModel)]="split" (ngModelChange)="handleSplitChange($event)"/>
      </label>
      @if (split>40) {
        <br/>
        <div class="warningContainer">
          <p>With large sets you are less likely to get good coverage of all the characters of the sets.</p>
        </div>
      }
    </div>
    <div style="grid-area:a">
    @for (list of kanji; track $index) {
      <div class="setContainer">
        <label>Set Name
            <input type="text" [(ngModel)]="list.name"/>
        </label> count: {{list.set.length}}
        @for (item of list.set; track $index) {
          <details (toggle)="getKanjiInfo(item,$event)">
            <summary><h1>{{item}}</h1></summary>
            @if (kanjiInfo[item] !== undefined){
              <p>On readings: <app-hover-ables-container [text]="kanjiInfo[item].on_readings.join(', ')"/></p>
              <p>Kun readings: <app-hover-ables-container [text]="kanjiInfo[item].kun_readings.join(', ')"/></p>
              <p>English meaning: {{kanjiInfo[item].meanings.join(', ')}}</p>
            }
          </details>
        }
      </div>
    }
  </div>
  </div>
  `,
  styles: [
    '@media screen and (min-width:700px) {.gridContainer { display: grid; grid-template-areas: "a a b"; }}',
    'h1:first-of-type {  text-align:center; }',
    'summary { list-style:none; cursor:pointer; text-align:center; }',
    'div.setContainer { border:.2rem solid black; border-radius:.5rem; max-height:20rem; overflow:auto; margin:1rem; padding:1rem; }',
    '@media screen and (min-width:700px) {div.setContainer { min-width:30rem; }}',
    '.warningContainer { color:red; }',
    '@media screen and (min-width:700px) {.gridAreaB { width:15rem; grid-area:b;}}',
    '@media screen and (max-width:700px) {.gridAreaB { width:100%; margin-bottom:3rem; }}',
    '.saveSets { width:100%; margin-bottom:.5rem; font-size:large; }',
  ]
})
export class EditTrainingSetsComponent {
  private route = inject(ActivatedRoute);

  kanji:KanjiTrainingSet[] = [];
  kanjiInfo: {[key:string]: Kanji} = {};

  split: number = 30;

  constructor(private kanjiApiService:IKanjiapi, private kanjiTrainingSetService:ITrainingSet) {
    this.route.queryParams.subscribe(params => {
      if (params["new"] == undefined) { return }
      this.kanji[0] = { name: "", set: decodeURIComponent(params["new"]).split("") };
      this.handleSplitChange(this.split);
    })
  }

  async getKanjiInfo(kanji:string,event:Event): Promise<void> {
    if ((event as ToggleEvent).newState == "closed") { return; }
    let kanjiInfo = await this.kanjiApiService.GetKanjiInfo(kanji);
    this.kanjiInfo[kanji] = kanjiInfo;
  }

  handleSplitChange(split:any) {
    if (!split || split <= 0) {return}
    const oldNames:string[] = this.kanji.map(l=>l.name);
    this.kanji = [{ name: this.kanji[0].name, set: this.kanji.map(l=>l.set??[]).flat()}];
    for (let i=0;this.kanji[i].set!.length>split;i++){
      this.kanji[i+1] = { name: oldNames[i+1]??"", set: this.kanji[i].set?.slice(split)};
      this.kanji[i].set = this.kanji[i].set?.slice(0,split);
    }
  }

  saveSets(e:EventTarget) {
    if (this.kanji.map(l=>l.name).some(n=>n.length<=0)) {
      (e as HTMLInputElement).setCustomValidity("Sets must all be named");
      (e as HTMLInputElement).reportValidity();
      return
    }
    this.kanjiTrainingSetService.AddTrainingSets(this.kanji);
    (e as HTMLInputElement).setCustomValidity("Sets Saved");
    (e as HTMLInputElement).reportValidity();
  }
}
