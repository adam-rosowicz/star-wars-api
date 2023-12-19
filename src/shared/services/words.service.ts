export class WordsService {
  public getUniqueWordsWithCountFromTexts(texts: string[]): { [key: string]: number } {
    const text = texts.join(" ");

    const words = text.split(/\s+/).map((word) => word.toLowerCase());

    return words.reduce((count, word) => {
      return { ...count, [word]: (count[word] || 0) + 1 };
    }, Object.create(null));
  }

  public getWordsMostOccuredInGivenList(searchedWords: string[], wordsWithCount: { word: string; count: number }[]) {
    const uniqueWords = wordsWithCount.filter(({ word }) => searchedWords.includes(word));

    const maxCountOfWord = Math.max(...uniqueWords.map((item) => item.count));

    const wordsWithMaxCount = uniqueWords.filter((item) => item.count === maxCountOfWord);

    return wordsWithMaxCount;
  }
}
