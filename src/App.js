const { Console } = require('@woowacourse/mission-utils');
const UserBudget = require('./UserBudget');
const LottoMachine = require('./LottoMachine');
const Lotto = require('./Lotto');
const INPUT_BUDGET = '구입금액을 입력해 주세요.\n';

class App {
  budget;
  lottoTickets;
  lottoWinNumbers;

  play() {
    this.getUserBudget();
  }

  printSpaceLine() {
    Console.print('');
  }

  getUserBudget() {
    Console.readLine(INPUT_BUDGET, (input) => {
      this.validateUserBudget(input);
      this.printSpaceLine();
    });
  }

  validateUserBudget(budget) {
    this.budget = new UserBudget(Number(budget));
    this.lottoTickets = new LottoMachine(budget);
    this.getWinLottoNumbers();
  }

  getWinLottoNumbers() {
    Console.readLine('당첨 번호를 입력해 주세요.', (input) => {
      const winNumber = input.split(',');
      this.validateIsNotNumber(winNumber);
      this.lottoWinNumbers = new Lotto(winNumber);
      Console.print(this.lottoWinNumbers.join(''));
      Console.close();
    });
  }

  validateIsNotNumber(winNumber) {
    for (let i = 0; i < winNumber.length; i++) {
      if (isNaN(...winNumber[i])) {
        throw new Error('[ERROR] 당첨 번호는 숫자만 입력해야 합니다.');
      }
    }
  }
}

const app = new App();
app.play();

module.exports = App;
