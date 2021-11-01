import {Account, Category, Transaction} from 'components/models';

export interface GeneralStateInterface {
  accounts: Account[];
  accountSelected: Account;
  categories: Category[];
  categorySelected: Category;
  categoriesAllowed: number[];
  transactions: Transaction[];

}

function state(): GeneralStateInterface {
  return {
    accounts: <Account[]>[],
    accountSelected: <Account>{},
    categories: <Category[]>[],
    categorySelected: <Category>{},
    transactions: <Transaction[]>[],
    categoriesAllowed: <number[]>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  }
};

export default state;
