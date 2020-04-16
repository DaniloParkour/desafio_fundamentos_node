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
    /* const incomeArray = this.transactions.filter(value =>
      value.type === 'income' ? value : 0,
    );

    const outcomeArray = this.transactions.filter(value =>
      value.type === 'outcome' ? value : 0,
    );

    const incomeValue = incomeArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
    );

    const outcomeValue = outcomeArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
    ); */

    const sumIncome = 0;
    const sumOutcome = 0;

    // | 'outcome'

    this.transactions.map(transaction => {
      if (transaction.type === 'income') sumIncome += transaction.value;
      else sumOutcome += transaction.value;
    });

    const balance: Balance = {
      /* income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue, */
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
