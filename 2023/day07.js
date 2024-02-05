/* eslint-disable max-classes-per-file */

'strict';

const AOC = require('./AOC');

AOC.setDay(7);

class Card {
  static cardMap = {
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    T: 'Ten',
    J: 'Jack',
    Q: 'Queen',
    K: 'King',
    A: 'Ace',
  };

  constructor(card) {
    this.name = Card.cardMap[card];
    this.rank = Object.keys(Card.cardMap).indexOf(card);
    if (!this.name) {
      throw new Error(`No card matching '${card}'`);
    }
  }

  localeCompare(other) {
    return this.rank - other.rank;
  }

  compare(other, jokers) {
    if (!jokers) return this.localeCompare(other);

    if ((this.name === Card.cardMap.J && other.name === Card.cardMap.J)
        || (this.name !== Card.cardMap.J && other.name !== Card.cardMap.J)) {
      return this.localeCompare(other);
    }
    return this.name === Card.cardMap.J ? -1 : 1;
  }
}

class Hand {
  static handTypes = [
    'HighCard',
    'OnePair',
    'TwoPair',
    'ThreeOfAKind',
    'FullHouse',
    'FourOfAKind',
    'FiveOfAKind',
  ];

  constructor(line) {
    const [cards, bid] = line.split(' ');
    this.bid = parseInt(bid, 10);
    this.cards = [...cards].map((char) => new Card(char));
  }

  handType(jokers = false) {
    return jokers ? this.handTypeWithJokers() : this.handTypeWithoutJokers();
  }

  handTypeWithoutJokers() {
    const cardCounts = Object.values(this.cards.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {})).sort((a, b) => b - a);

    switch (cardCounts.toString()) {
      case '5':
        return 6; // HandType.FiveOfAKind;
      case '4,1':
        return 5; // HandType.FourOfAKind;
      case '3,2':
        return 4; // HandType.FullHouse;
      case '3,1,1':
        return 3; // HandType.ThreeOfAKind;
      case '2,2,1':
        return 2; // HandType.TwoPair;
      case '2,1,1,1':
        return 1; // HandType.OnePair;
      case '1,1,1,1,1':
        return 0; // HandType.HighCard;
      default:
        throw new Error(`No matching hand type for ${this.cards}`);
    }
  }

  handTypeWithJokers() {
    const tally = this.cards.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    const jokerCount = tally[Card.cardMap.J] || 0;
    delete tally[Card.cardMap.J];

    if (jokerCount === 0) return this.handType(false);

    const cardCounts = Object.values(tally).sort((a, b) => b - a);

    switch (JSON.stringify([jokerCount, cardCounts])) {
      case '[5,[]]':
        return 6; // HandType.FiveOfAKind;
      case '[4,[1]]':
        return 6; // HandType.FiveOfAKind;
      case '[3,[2]]':
        return 6; // HandType.FiveOfAKind;
      case '[2,[3]]':
        return 6; // HandType.FiveOfAKind;
      case '[1,[4]]':
        return 6; // HandType.FiveOfAKind;
      case '[1,[3,1]]':
        return 5; // HandType.FourOfAKind;
      case '[2,[2,1]]':
        return 5; // HandType.FourOfAKind;
      case '[3,[1,1]]':
        return 5; // HandType.FourOfAKind;
      case '[1,[2,2]]':
        return 4; // HandType.FullHouse;
      case '[1,[2,1,1]]':
        return 3; // HandType.ThreeOfAKind;
      case '[2,[1,1,1]]':
        return 3; // HandType.ThreeOfAKind;
      case '[1,[1,1,1,1]]':
        return 1; // HandType.OnePair;
      default:
        throw new Error(`No matching hand type for ${this.cards}`);
    }
  }

  compare(other, jokers = false) {
    const otherTypeComp = this.handType(jokers) - other.handType(jokers);
    if (otherTypeComp !== 0) return otherTypeComp;

    const cardComps = this.cards.map((card, i) => card.compare(other.cards[i], jokers));
    const nonZeroCardComps = cardComps.filter((comp) => comp !== 0);
    return nonZeroCardComps.length > 0 ? nonZeroCardComps[0] : 0;
  }
}

function winnings(sortedHands) {
  return sortedHands.map((hand, i) => hand.bid * (i + 1)).reduce((sum, value) => sum + value, 0);
}

const hands = AOC.lines.map((line) => new Hand(line));

AOC.part1(() => winnings(hands.slice().sort((a, b) => a.compare(b)))); // 255048101
AOC.part2(() => winnings(hands.slice().sort((a, b) => a.compare(b, true)))); // 253718286
