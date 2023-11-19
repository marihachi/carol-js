export declare class Carol {
    pattern: string;
    constructor(tree: Carol | Carol[]);
    constructor(pattern: string);
    many0(greedy?: boolean): Carol;
    many1(greedy?: boolean): Carol;
    manyJust(count: number): Carol;
    many(min: number, max: number, greedy?: boolean): Carol;
    many(min: number, greedy?: boolean): Carol;
    capture(): Carol;
    build(flags?: Flag | Flag[]): RegExp;
}
export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';
export declare function regex(pattern: RegExp | RegExp[]): Carol;
export declare function seq(tree: Carol | Carol[]): Carol;
