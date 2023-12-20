import { expect } from "chai";
import { WordsService } from "../../shared/services/words.service";

describe("WordsService", () => {
  const wordsService = new WordsService();
  describe("getUniqueWordsWithCountFromTexts", () => {
    it("should return unique unique words paired with their occurences", () => {
      const result = wordsService.getUniqueWordsWithCountFromTexts(["Ala ma kota", "Kot ma Ale"]);

      expect(result).to.deep.include({ ala: 1 });
      expect(result).to.deep.include({ ma: 2 });
      expect(result).to.deep.include({ kota: 1 });
      expect(result).to.deep.include({ kot: 1 });
      expect(result).to.deep.include({ ale: 1 });
    });
  });

  describe("getWordsMostOccuredInGivenList", () => {
    it("should return unique unique words paired with their occurences", () => {
      const result = wordsService.getWordsMostOccuredInGivenList(
        ["Ala", "ma"],
        [
          {
            word: "ala",
            count: 1,
          },
          { word: "ma", count: 2 },
          { word: "kota", count: 1 },
          { word: "kot", count: 1 },
          { word: "ale", count: 1 },
        ],
      );

      expect(result).to.be.an("array").length(1);
      expect(result[0]).to.haveOwnProperty("word", "ma");
      expect(result[0]).to.haveOwnProperty("count", 2);
    });
  });
});
