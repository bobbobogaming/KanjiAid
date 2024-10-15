import { KanjiTrainingSet } from "../../Types/kanji-training-set";

export abstract class ITrainingSet {
    abstract SetTrainingSets(sets:KanjiTrainingSet[]): void;
    abstract GetAllTrainingSets(): KanjiTrainingSet[] | never;
}
