import { OnDestroy, AfterContentInit, Component, Renderer2 } from '@angular/core';
import { HoverAblesContainerComponent } from '../hover-ables-container/hover-ables-container.component';
import { KanjiTrainingSet } from '../../Types/kanji-training-set';
import { Kanji } from '../../Types/kanji';
import { RomajiInputComponent } from '../romaji-input/romaji-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IKanjiapi } from '../../Services/Interfaces/ikanjiapi.service';
import { ITrainingSet } from '../../Services/Interfaces/itraining-set.service';
import { StdKanjiTrainingSets } from '../../Types/std-kanji-training-sets.collection';
import { KanjiTrainingStat } from '../../Types/kanji-training-stat';
import { ITrainingStats } from '../../Services/Interfaces/itraining-stats.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [HoverAblesContainerComponent, RomajiInputComponent, MatButtonModule, MatProgressSpinner, MatTab, MatTabGroup],
  template: `
    <h1>Kanji Quiz</h1>
    <mat-tab-group (selectedTabChange)="getNewQuizChar()">
      <mat-tab label="Guess the reading">
        <div class="quizContainer">
        <label>
          Guess any reading:
          <app-romaji-input [(value)]="guess"/>
        </label>
        @if (guessedRight || attempts >= 3) {
          <button (click)="checkGuess()" mat-button>New Character</button>
        } @else {
          <button (click)="checkGuess()" mat-button>Confirm guess</button>
        }
        @if (quizKanji !== undefined) {
          @if (attempts >= 3) {
            <br/>
            <p>Please input a correct reading to continue to a new character</p>
          }
          @if (debugMode) {
            <p>On readings: {{charCodeCollections(quizKanji.on_readings)}}</p>
            <p>Kun readings: {{charCodeCollections(quizKanji.kun_readings)}}</p>
            <p>Guess {{charCodeCollections([guess])}}</p>
          }
          <h1>{{quizKanji.kanji}}</h1>
          @if (guessedRight || attempts >= 3) {
            <p>On readings: <app-hover-ables-container [text]="quizKanji.on_readings.join(', ')"/></p>
            <p>Kun readings: <app-hover-ables-container [text]="quizKanji.kun_readings.join(', ')"/></p>
            <p>English meaning: {{quizKanji.meanings.join(', ')}}</p>
          } @else if (guessedRight === false) {
            <p>You guessed wrong</p>
            <p>Try again</p>
          }
        }
        </div>
      </mat-tab>
      <mat-tab label="1 of 3">
        <div class="quizContainer">
          <h2>Guess the right Kanji</h2>
          @if (quizKanji !== undefined) {
            <h3>Kanji means:<br/>{{quizKanji.meanings.join(', ')}}</h3>
            <div class="multipleChoiceOptionContainer">
              @for (item of multipleChoiceOptions; track $index) {
                @if (guessedRight === undefined) {
                  <button (click)="checkMultipleChoice(item)">{{item}}</button>
                }
                @else {
                  @if (item == quizKanji.kanji) {
                    <button class="buttonRightAnswer">{{item}}</button>
                  }
                  @else {
                    <button class="buttonWrongAnswer">{{item}}</button>
                  }
                }
              }
            </div>
            @if (guessedRight !== undefined) {
              <button (click)="getNewQuizChar()" class="newCharButton" mat-stroked-button>Get new Kanji</button>
            }
          }
        </div>
      </mat-tab>
    </mat-tab-group>
    <div>
      <p>Click radio buttons to select a training set</p>
      <details open>
        <summary>Training sets</summary>
        <div class="trainingSets">
          @for (item of trainingSets; track $index) {
            <details>
              <summary>{{item.name}}</summary>
              @for (char of item.set; track $index) {
                <div class="charContainer">
                  <mat-progress-spinner diameter="50" mode="determinate" [value]="((getStatsByCharacter(char)?.answeredRight! - getStatsByCharacter(char)?.answeredWrong!) / getStatsByCharacter(char)?.requiredAmount!) * 100"></mat-progress-spinner>
                  <div class="guessCount"><p>{{getStatsByCharacter(char)?.answeredRight! - getStatsByCharacter(char)?.answeredWrong!}}</p></div>
                  <p>{{char}}</p>
                </div>
            }
            </details>
            @if ($index == 0) {
              <input type="radio" name="trainingSet" (click)="handleSelectSetIndex($index)" checked />
            } @else {
              <input type="radio" name="trainingSet" (click)="handleSelectSetIndex($index)" />
            }
          }
        </div>
      </details>
    </div>
  `,
  styles: [
    '@media screen and (min-width:700px) { :host { display:grid; column-gap:1rem; grid-template-columns:1.5fr 1fr;} }',
    'h1:first-of-type { grid-column:1 / 3; text-align:center; }',
    '.quizContainer { border-radius:1rem; border:.1rem solid #0000001f; height:fit-content; padding:5px; }',
    '.guessCount { margin-left: -2rem; margin-right:1rem; height:2rem; width:2rem; display:flex; justify-content:center; align-items:center; }',
    '.guessCount>p { margin: 0; height:fit-content; width:fit-content; }',
    'mat-progress-spinner { height:2rem!important; width:2rem!important; }',
    'svg { height:2rem; width:2rem; transition: d 2s; }',
    '.charContainer { display:flex; align-items:center; }',
    '.trainingSets { margin-left:1rem; display:grid; grid-template-columns:5fr 1fr; align-items:start; }',
    '.trainingSets>details { max-height:80vh; overflow:auto; }',
    '.trainingSets>details>div:nth-child(2) { margin-top:1rem; }',
    '.trainingSets>details>summary { position:absolute; background:white; z-index:2; }',
    'div.multipleChoiceOptionContainer { display:flex; justify-content:space-evenly; font-size:large; }',
    'div.multipleChoiceOptionContainer > * { font-size:xx-large; font-weight:bold; }',
    '.quizContainer > h3:first-of-type { justify-self:center }',
    'button.buttonWrongAnswer { background-color:red; }',
    'button.buttonRightAnswer { background-color:lawngreen; }',
    '.newCharButton { display:block; justify-self:center; margin-top:1rem; }',
  ]
})
export class QuizPageComponent implements AfterContentInit, OnDestroy {
  trainingSets:KanjiTrainingSet[] = [];
  trainingStats:KanjiTrainingStat[] = [];
  selectedSetIndex:number = 0;
  quizKanji:Kanji|undefined;
  guess:string = ""
  attempts:number = 0;
  guessedRight:boolean|undefined;
  debugMode:boolean = false;

  multipleChoiceOptions:string[]=[]
  
  constructor(private kanjiApiService:IKanjiapi, private trainingSetsService:ITrainingSet, private trainingStatsService:ITrainingStats){}
  
  ngOnDestroy(): void {
    this.trainingSetsService.SetTrainingSets(this.trainingSets);
    this.trainingStatsService.SetTrainingStats(this.trainingStats);
  }

  async ngAfterContentInit(): Promise<void> {
    try {
      let savedSets = this.trainingSetsService.GetAllTrainingSets();
      this.trainingSets = savedSets;
    } catch (error) {
      this.trainingSets = StdKanjiTrainingSets.sets;      
    }
    try {
      let savedStats = this.trainingStatsService.GetAllTrainingStats();
      this.trainingStats = savedStats;
    } catch (error) {}

    for (let item of this.trainingSets.map(s=>s.set).flat().filter((v,i,a)=>a.indexOf(v)===i)) {
      if (this.trainingStats.map(s=>s.kanji).indexOf(item) != -1) { continue; }

      this.trainingStats.push({ kanji:item, answeredRight:0, answeredWrong:0, requiredAmount:10 });
    }
    
    this.getNewQuizChar();
  }

  async getNewQuizChar():Promise<void> {
    let currentSetSorted = [...this.trainingSets[this.selectedSetIndex].set].sort((a,b)=>{
      if (((this.getStatsByCharacter(a)?.answeredRight??0) - (this.getStatsByCharacter(a)?.answeredWrong??0)) >= (this.getStatsByCharacter(a)?.requiredAmount??1)) return 1;
      if (((this.getStatsByCharacter(b)?.answeredRight??0) - (this.getStatsByCharacter(b)?.answeredWrong??0)) >= (this.getStatsByCharacter(b)?.requiredAmount??1)) return -1;
      if (this.getStatsByCharacter(a)?.answeredRight == 0) return 1;
      if (this.getStatsByCharacter(b)?.answeredRight == 0) return -1;
      return (this.getStatsByCharacter(a)?.answeredRight??0) - (this.getStatsByCharacter(b)?.answeredRight??0)
    })
    let newQuizChar = currentSetSorted[Math.floor(Math.pow(Math.random()*Math.sqrt(this.trainingSets[this.selectedSetIndex].set.length),2))]
    this.quizKanji = await this.kanjiApiService.GetKanjiInfo(newQuizChar!);
    this.guess = "";
    this.attempts = 0;
    this.guessedRight = undefined;
    this.getMultipleChoice();
  }

  handleSelectSetIndex(index:number):void {
    this.selectedSetIndex = index;
  }

  checkGuess():void {
    if (this.guess === 'DEBUG') {
      this.debugMode = !this.debugMode;
      return;
    }
    if (this.quizKanji?.on_readings.some(r=>r == this.guess) || this.quizKanji?.kun_readings.some(r=>r == this.guess)) {
      if (this.guessedRight || this.attempts >= 3) {
        this.getNewQuizChar();
        return; 
      }
      this.guessedRight = true;
      if (this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)) {
        this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)!.answeredRight!++
      }
    } else {
      if (this.attempts >= 3) { return; }
      if (this.guessedRight === undefined) {
        if (this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)) {
          this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)!.answeredWrong!++
        }
      }
      this.attempts++;
      this.guessedRight = false;
    }
  }

  private statsCache:KanjiTrainingStat | undefined
  getStatsByCharacter(char:string):KanjiTrainingStat | undefined {
    if (this.statsCache?.kanji != char) {
      let kanjiStat = this.trainingStats.find(s=>s.kanji==char);
      this.statsCache = kanjiStat;
    }

    return this.statsCache;
  }

  async getMultipleChoice():Promise<void> {
    if (this.quizKanji === undefined) { return; }
    if (this.quizKanji.kanji === undefined) { return; }
    let listWithout = [...this.trainingSets[this.selectedSetIndex].set].filter(c=>c!==this.quizKanji?.kanji)
    let currentSetSorted = listWithout.sort((a,b)=>{
      if (((this.getStatsByCharacter(a)?.answeredRight??0) - (this.getStatsByCharacter(a)?.answeredWrong??0)) >= (this.getStatsByCharacter(a)?.requiredAmount??1)) return 1;
      if (((this.getStatsByCharacter(b)?.answeredRight??0) - (this.getStatsByCharacter(b)?.answeredWrong??0)) >= (this.getStatsByCharacter(b)?.requiredAmount??1)) return -1;
      if (this.getStatsByCharacter(a)?.answeredRight == 0) return 1;
      if (this.getStatsByCharacter(b)?.answeredRight == 0) return -1;
      return (this.getStatsByCharacter(a)?.answeredRight??0) - (this.getStatsByCharacter(b)?.answeredRight??0)
    })

    let randomChars = currentSetSorted.filter(c=>c!=this.quizKanji?.kanji).sort(()=>Math.floor(Math.random()*3)-1).slice(0,2);
    randomChars.push(this.quizKanji.kanji!);
    this.multipleChoiceOptions = randomChars.sort(()=>Math.floor(Math.random()*3)-1);
  }

  checkMultipleChoice(char:string) {
    if (char === this.quizKanji?.kanji) {
      this.guessedRight = true;
      if (this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)) {
        this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)!.answeredRight!++;
      }
    } else {
      this.guessedRight = false;
      if (this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)) {
        this.trainingStats.find(s=>s.kanji == this.quizKanji?.kanji)!.answeredWrong!++;
      }
    }
  }

  charCodeCollections(values:string[]):string{
    return values.map(s=>`{${s.split('').map(c=>c.charCodeAt(0)).join(',')}}`).join(',');
  }
}
