/* eslint-disable no-underscore-dangle */

'strict';

const AOC = require('./AOC');

AOC.setDay(4);

class Card {
  constructor(line) {
    const md = line.match(/Card\s*(\d+): (.*) \| (.*)/);

    this.id = Number(md[1]);
    this.winning = new Set(md[2].trim().split(/\s+/).map(Number));
    this.numbers = new Set(md[3].trim().split(/\s+/).map(Number));
    this.instances = 1;
  }

  get matchSize() {
    if (!this._matchSize) {
      this._matchSize = [...this.winning].filter((num) => this.numbers.has(num)).length;
    }
    return this._matchSize;
  }

  get points() {
    return this.matchSize === 0 ? 0 : 2 ** (this.matchSize - 1);
  }
}

const cards = AOC.lines.map((line) => new Card(line));

AOC.part1(() => cards.reduce((sum, card) => sum + card.points, 0)); // 21959

AOC.part2(() => {
  cards.forEach((card, i) => {
    const range = card.matchSize;

    cards.slice(i + 1, i + 1 + range).forEach((nextCard) => {
      nextCard.instances += card.instances;
    });
  });

  return cards.reduce((sum, card) => sum + card.instances, 0); // 5132675
});
