import { KanjiTrainingStat } from "../../Types/kanji-training-stat";

export abstract class ITrainingStats {
    abstract SetTrainingStats(sets:KanjiTrainingStat[]): void;
    abstract GetAllTrainingStats(): KanjiTrainingStat[] | never;
}
