import { Injectable } from '@angular/core';
import { IKanjiapi } from '../Interfaces/ikanjiapi.service';
import { KanjiList } from '../../Types/kanji-list';
import { Kanji } from '../../Types/kanji';

@Injectable({
  providedIn: 'root'
})
export class KanjiapiService implements IKanjiapi {

  constructor() { }

  async GetKanjiByGrade(grade: number): Promise<KanjiList> {
    let response = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${grade}`);

    if (!response.ok) { throw Error(response.statusText); }

    let responseJson = await response.text();

    let kanjiList : string[] = JSON.parse(responseJson);
    let kanji = new KanjiList();
    kanji.kanji = kanjiList;

    return kanji;
  }

  async GetKanjiInfo(kanji: string): Promise<Kanji> {
    let response = await fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`);

    if (!response.ok) { throw Error(response.statusText); }

    let responseJson = await response.text();

    let kanjiInfo : Kanji = JSON.parse(responseJson);

    return kanjiInfo;    
  }
}
