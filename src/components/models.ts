export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}


export interface Account {
  id: number,
  name: string,
  description: string,
  is_active: boolean
}


export interface Category {
  id: number,
  name: string,
  is_pinned: boolean
}
