import { Injectable } from '@angular/core';
import { ITrainingStats } from '../Interfaces/itraining-stats.service';
import { KanjiTrainingStat } from '../../Types/kanji-training-stat';

@Injectable({
  providedIn: 'root'
})
export class TrainingStatsService implements ITrainingStats {

  SetTrainingStats(sets: KanjiTrainingStat[]): void {
    let setsJson = JSON.stringify(sets);
    localStorage.setItem('trainingStats', setsJson);
  }
  GetAllTrainingStats(): KanjiTrainingStat[] | never {
    let setsJson = localStorage.getItem('trainingStats');
    
    if (setsJson == null) {
      throw new Error('Stats Not Found');
    }

    let sets:KanjiTrainingStat[] = JSON.parse(setsJson);

    return sets;
  }
}
