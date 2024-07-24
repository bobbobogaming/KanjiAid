import { Kanji } from "../../Types/kanji";
import { KanjiList } from "../../Types/kanji-list";

export abstract class IKanjiapi {
    abstract GetKanjiByGrade(grade:number): Promise<KanjiList>
    abstract GetKanjiInfo(kanji:string): Promise<Kanji>
}
