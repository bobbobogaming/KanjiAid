export class Kanji {
    kanji:string|undefined
    kun_readings:string[] = []
    on_readings:string[] = []
    name_readings:string[] = []
    meanings:string[] = []
    stroke_count:number|undefined
    unicode:string|undefined
    grade:1|2|3|4|5|6|8|9|null|undefined
    jlpt:1|2|3|4|null|undefined
    heisig_en:string|null|undefined
    freq_mainichi_shinbun:number|null|undefined
    unihan_cjk_compatibility_variant:string|undefined
    notes:string[]|undefined
}
