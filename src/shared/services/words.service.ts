export class WordsService {
  public getUniqueWordsWithCountFromTexts(texts: string[]): { [key: string]: number } {
    const text = texts.join(" ");

    const words = text.split(/\s+/).map((word) => word.toLowerCase());

    return words.reduce((count, word) => {
      return { ...count, [word]: (count[word] || 0) + 1 };
    }, Object.create(null));
  }
}
