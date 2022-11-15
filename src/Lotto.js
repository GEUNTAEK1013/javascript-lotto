class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    this.validateLengthIsSix(numbers);
    this.validateIsDuplication(numbers);
    this.validateInNumberRange(numbers);
  }

  validateLengthIsSix(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  validateIsDuplication(numbers) {
    const duplicationCheck = new Set(numbers);
    if (duplicationCheck.size !== numbers.length) {
      throw new Error('[ERROR] 중복이 없는 서로 다른 숫자를 입력하세요.');
    }
  }

  validateInNumberRange(numbers) {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < 1 || numbers[i] > 45) {
        throw new Error('[ERROR] 로또 번호는 숫자 1 ~ 45 범위 내에서 입력하세요.');
      }
    }
  }

  compareWithWinNumbers(bonusNumber) {
    if (this.#numbers.includes(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호와 당첨 번호는 중복되지 않아야 합니다.');
    }
  }

  checkLottoWinResult(userBuyedTickets, bonusNumber) {
    const lottoResult = [0, 0, 0, 0, 0];
    userBuyedTickets.forEach((numbers) => {
      switch (this.checkMatchLottoNumber(numbers)) {
        case 3:
          lottoResult[0] += 1;
          break;
        case 4:
          lottoResult[1] += 1;
          break;
        case 5:
          this.checkHasBonusNumber(numbers, bonusNumber)
            ? (lottoResult[3] += 1)
            : (lottoResult[2] += 1);
          break;
        case 6:
          lottoResult[4] += 1;
          break;
      }
    });
    console.log('lottoResult', lottoResult);
    return lottoResult;
  }

  checkMatchLottoNumber(numbers) {
    return numbers.filter((number) => this.#numbers.includes(String(number))).length;
  }

  checkHasBonusNumber(numbers, bonusNumber) {
    return numbers.includes(bonusNumber);
  }
}

module.exports = Lotto;
