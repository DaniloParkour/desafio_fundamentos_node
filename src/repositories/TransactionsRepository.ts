import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((accumulator, currentValue) => {
      console.log(`Income = ${accumulator}`);
      if (currentValue.type === 'income')
        return accumulator + currentValue.value;
      return accumulator;
    }, 0);

    const sumOutcome = this.transactions.reduce((accumulator, currentValue) => {
      console.log(`Outcome = ${accumulator}`);
      if (currentValue.type === 'outcome')
        return accumulator + currentValue.value;
      return accumulator;
    }, 0);

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
