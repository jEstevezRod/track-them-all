import {api} from 'boot/axios';
import {Account, Category, Transaction} from 'components/models';
import {date} from 'quasar';

class TransactionService {

  getAll(account_id: string): Promise<any> {
    return api.get('/transactions', {params: {account_id}});
  }

  get(id: string): Promise<any> {
    return api.get(`/transactions/${id}`);
  }

  store(data: any): Promise<any> {
    return api.post('/transactions', data);
  }

  update(id: string, data: any): Promise<any> {
    return api.put(`/transactions/${id}`, data);
  }

  delete(id: string): Promise<any> {
    return api.delete(`/transactions/${id}`);
  }

  createFromAggregates(amount: number, account: Account, category: Category): Transaction {
    const transaction: Transaction = {
      'amount': amount,
      'issued_at': date.formatDate(Date.now(), 'DD-MM-YYYY HH:mm:ss'),
      'account_id': account.id,
      'category_id': category.id
    }
    return transaction
  }

}

export default new TransactionService();
