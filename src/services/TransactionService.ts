import {api} from 'boot/axios';

class TransactionService {
  getAll(): Promise<any> {
    return api.get('/transactions');
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
}

export default new TransactionService();
