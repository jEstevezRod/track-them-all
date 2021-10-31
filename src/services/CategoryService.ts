import {api} from 'boot/axios';

class CategoryService {
  getAll(): Promise<any> {
    return api.get('/categories');
  }

  get(id: string): Promise<any> {
    return api.get(`/categories/${id}`);
  }

  store(data: any): Promise<any> {
    return api.post('/categories', data);
  }

  update(id: string, data: any): Promise<any> {
    return api.put(`/categories/${id}`, data);
  }

  delete(id: string): Promise<any> {
    return api.delete(`/categories/${id}`);
  }
}

export default new CategoryService();
