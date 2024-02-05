require('dotenv').config();

const axios = require('axios');
const fs = require('fs');

const AOC = {
  YEAR: 2023,
  day: 0,
  inputLoaded: false,
  input: '',

  setDay(day) {
    this.day = day;
  },

  get inputPath() {
    return `${this.day.toString().padStart(2, '0')}_input.txt`;
  },

  loadInput() {
    if (!this.inputLoaded) {
      this.input = this.loadInputSync(this.day);
      this.inputLoaded = true;
    }
  },

  eachLine(callback) {
    this.loadInput();
    this.input.split('\n').forEach(callback);
  },

  get lines() {
    this.loadInput();
    // Need to wait for file promis to resolve
    return this.input.split('\n').filter((line) => line !== '');
  },

  get lineSections() {
    this.loadInput();
    return this.input.split('\n\n').map((section) => section.split('\n').filter((line) => line !== ''));
  },

  get getInput() {
    this.loadInput();
    return this.input;
  },

  part1(callback) {
    console.log(`part 1 : ${callback()}`);
  },

  part2(callback) {
    console.log(`part 2 : ${callback()}`);
  },

  loadInputSync(day) {
    if (fs.existsSync(this.inputPath)) {
      return fs.readFileSync(this.inputPath, 'utf8');
    }
    return this.downloadFile(day);
  },

  downloadFile(day) {
    console.log('>> downloading input for the first time');

    const url = `https://adventofcode.com/${this.YEAR}/day/${day}/input`;
    const headers = { Cookie: `session=${process.env.AOC_SESSION}` };

    return axios.get(url, { headers })
      .then((response) => {
        const input = response.data;
        fs.writeFileSync(this.inputPath, input);
        return input;
      })
      .catch((error) => {
        throw new Error(`Error fetching puzzle input: ${error.message}`);
      });
  },

  log(message) {
    console.log(`❄️  ${message}`);
  },
};

module.exports = AOC;
