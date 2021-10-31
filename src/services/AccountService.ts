import {api} from 'boot/axios';

class AccountService {
  getAll(): Promise<any> {
    return api.get('/accounts');
  }

  get(id: string): Promise<any> {
    return api.get(`/accounts/${id}`);
  }

  store(data: any): Promise<any> {
    return api.post('/accounts', data);
  }

  update(id: string, data: any): Promise<any> {
    return api.put(`/accounts/${id}`, data);
  }

  delete(id: string): Promise<any> {
    return api.delete(`/accounts/${id}`);
  }
}

export default new AccountService();
