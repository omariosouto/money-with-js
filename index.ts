import { BigDecimal, sumAllPayments } from "./infra";

// Como trabalhar com dinheiro em programação?

const paymentsByVideoAsNumber = [
  10.00, // Primeiro Vídeo = $10.00
  20.00, // Segundo Vídeo = $20.00
];
const firstMonth = sumAllPayments(paymentsByVideoAsNumber);
console.log("Primeiro Pagamento (dólares): ", firstMonth + "\n");

const paymentsByVideoAsFloat = [
  0.10, // Terceiro Vídeo = $0.10
  0.20, // Quarto Vídeo = $0.20
];
const secondMonth = sumAllPayments(paymentsByVideoAsFloat);
console.log("Segundo Pagamento (dólares): ", secondMonth + "\n"); // Por que 0.30000000000000004?
// -> https://0.30000000000000004.com/
/**
 ## IEEE 754: https://en.wikipedia.org/wiki/IEEE_754
 - Define como representar números de ponto flutuante em binário
  - 0.10 = 0.0001100110011001| 1001100110011001100110011001100110011010 (acabou espaço)
  - 0.20 = 0.0011001100110011| 001100110011001100110011001100110011010 (acabou espaço)
  - O arredondamento nas somas dos binários de: 0.10 + 0.20 = 0.30000000000000004
    - Arredonda por que só tem (64 bits = 8 bytes = 16 dígitos) para representar
- Números como 0.1 e 0.2 não podem ser representados exatamente em binário,
  assim como 1/3 não pode ser representado exatamente em decimal.
  - 1/3 = 0,33333333
*/

/*
[Number.MAX_SAFE_INTEGER] = 9007199254740991
[Number.MAX_SAFE_INTEGER] 9007199254740991 + 1 = 9007199254740992
[Number.MAX_SAFE_INTEGER] 9007199254740991 + 2 = 9007199254740992
[Number.MAX_SAFE_INTEGER] 9007199254740991 + 3 = 9007199254740994
=============
[BigInt(Number.MAX_SAFE_INTEGER)] 9007199254740991n + 1n = 9007199254740992n
[BigInt(Number.MAX_SAFE_INTEGER)] 9007199254740991n + 2n = 9007199254740993n
[BigInt(Number.MAX_SAFE_INTEGER)] 9007199254740991n + 3n = 9007199254740994n

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
*/

const paymentsByVideoAsCents = [
  10, // Terceiro Vídeo $0,10
  20, // Quarto Vídeo $0,20
];
const secondMonthInCents = sumAllPayments(paymentsByVideoAsCents);
console.log("Segundo Pagamento (cents): ", secondMonthInCents, " | "  ,(secondMonthInCents / 100) + "\n\n");

// ============================================================
// ============================================================
// ============================================================

console.log("Só que o youtube paga 1 centavo pra cada 1000 views, se eu tiver só 200 views e 100views, como ele vai me pagar partes de um centavo?");
const paymentsByVideoAsMicrocents = [
  (1 / 1000) * 200,
  (1 / 1000) * 100,
];
const fourthMonth = sumAllPayments(paymentsByVideoAsMicrocents); // 0.30000000000000004
console.log("Terceiro Pagamento (Float): ", fourthMonth);

console.log("Terceiro Pagamento (BigDecimal): ", 
  new BigDecimal(0)
    .add((1 / 1000) * 200)
    .add((1 / 1000) * 100)
    .toString()
); // 0.3


// Como lidar com dinheiro?
// -> money.ts
import("./money");

// -> Você acabou de ver uma aula extra e gratuita do gratuita: https://crudcomqualidade.io/