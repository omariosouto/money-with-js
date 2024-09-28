import Decimal from 'decimal.js';

export class Money {
  private value: Decimal;

  constructor(amount: number | string | Decimal) {
    this.value = new Decimal(amount);
  }

  static fromCents(cents: number | string): Money {
    const amount = new Decimal(cents).dividedBy(100);
    return new Money(amount);
  }

  add(amount: Money | number | string): Money {
    const decimalAmount = amount instanceof Money ? amount.value : new Decimal(amount);
    return new Money(this.value.plus(decimalAmount));
  }

  subtract(amount: Money | number | string): Money {
    const decimalAmount = amount instanceof Money ? amount.value : new Decimal(amount);
    return new Money(this.value.minus(decimalAmount));
  }

  multiply(multiplier: number | string): Money {
    const decimalMultiplier = new Decimal(multiplier);
    return new Money(this.value.times(decimalMultiplier));
  }

  divide(divisor: number | string): Money {
    const decimalDivisor = new Decimal(divisor);
    return new Money(this.value.dividedBy(decimalDivisor));
  }

  toString(): string {
    return this.value.toFixed(2); // Formata com duas casas decimais
  }

  // Método para obter o valor em centavos
  toCents(): number {
    return this.value.times(100).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
  }
}


const purchasedItems = new Money(0);

console.log(
  purchasedItems
  .add("1")
  .toString()
);
