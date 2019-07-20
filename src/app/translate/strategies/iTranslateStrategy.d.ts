export interface ITranslateStrategy {
  canApply(index: number, text: string, value: any): boolean;
  apply(index: number, text: string, value: any): string;
}
