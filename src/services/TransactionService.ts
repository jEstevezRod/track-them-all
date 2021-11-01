import {api} from 'boot/axios';
import {Account, Category, Transaction} from 'components/models';
import {date} from 'quasar';

class TransactionService {

  getAll(account: Account): Promise<any> {
    return api.get('/transactions', {params: {account_id: account.id}});
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
      'amount': round(amount),
      'issued_at': date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      'account_id': account.id,
      'category_id': category.id
    }
    return transaction
  }

}

export default new TransactionService();

function round(num : number): number {
	// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	return +(Math.round(Number(num + 'e+2'))  + 'e-2');
}
