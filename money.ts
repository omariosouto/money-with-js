import Decimal from 'decimal.js';
import { z } from "zod";

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

  formatToCurrency(currency: "BRL" | "USD" = "USD"): string {
    // fix decimal separator and add R$
    if(currency === "BRL") {
      return `R$ ${this.value.toFixed(2).split('.').join(',')}`;
    }

    return `$ ${this.value.toFixed(2)}`;
  }

  // Método para obter o valor em centavos
  toCents(): number {
    return this.value.times(100).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
  }
}

console.log(
  new Money(0)
  .add("1")
  .toString()
);

// ================================================================================

const moneyValidator = z.custom<Money>((value) => {
  if (typeof value === "string" || typeof value === "number") {
    return new Money(value); // A validação passa, então retornamos true ou a própria instância para confirmar
  }
  throw new Error("Invalid value for Money");
});

const MoneySchema = moneyValidator.transform((value) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return new Money(value);
  }
  return value; // Se for uma instância de Money, retornamos o valor diretamente
});

const User = z.object({
  name: z.string(),
  age: z.number(),
  balance: MoneySchema, // Usando o schema customizado
});

console.log(
  User.parse({
  name: "John Doe",
    age: 30,
    balance: "1000",
  })
  .balance.formatToCurrency("BRL")
);