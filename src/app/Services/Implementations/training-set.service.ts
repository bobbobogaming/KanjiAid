import { Injectable } from '@angular/core';
import { ITrainingSet } from '../Interfaces/itraining-set.service';
import { KanjiTrainingSet } from '../../Types/kanji-training-set';
import { StdKanjiTrainingSets } from '../../Types/std-kanji-training-sets.collection';

@Injectable({
  providedIn: 'root'
})
export class TrainingSetService implements ITrainingSet {

  constructor() {}
  
  SetTrainingSets(sets: KanjiTrainingSet[]): void {
    let setsJson = JSON.stringify(sets);
    localStorage.setItem('trainingSets', setsJson);
  }
  
  GetAllTrainingSets(): KanjiTrainingSet[] | never {
    let setsJson = localStorage.getItem('trainingSets');
    
    if (setsJson == null) {
      throw new Error('Sets Not Found');
    }

    let sets:KanjiTrainingSet[] = JSON.parse(setsJson);

    return sets;
  }
}
