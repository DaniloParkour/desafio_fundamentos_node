import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactions = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactions.all();
    const balance = transactions.getBalance();
    response.json({ transactions: allTransactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO => title, value e type(income/outcome)
    /* {
      "i  d": "uuid",
      "title": "Salário",
      "value": 3000,
      "type": "income"
    } */

    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(transactions);

    const transaction = createTransaction.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
