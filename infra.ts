import Decimal from 'decimal.js';

export function sumAllPayments(arrayOfNumbers: number[]) {
  return arrayOfNumbers.reduce((_sum, num) => _sum + num, 0);
}

export class BigDecimal {
  private value: Decimal;

  constructor(value: number) {
    this.value = new Decimal(value);
  }

  // add must accept BigDecimal or number
  add(value: BigDecimal | number) {
    if (value instanceof BigDecimal) {
      return new BigDecimal(this.value.add(value.value).toNumber());
    }
    return new BigDecimal(this.value.add(value).toNumber());
  }

  toString() {
    return this.value.toString();
  }
}