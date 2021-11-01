
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

export interface CategoryOption {
  value: number,
  label: string,
}

export interface Transaction {
  id?: number,
  amount: number,
  issued_at: string,
  category_id: number,
  account_id: number,
  name?: string
}
