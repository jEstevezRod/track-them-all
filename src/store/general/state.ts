import {Account, Category} from 'components/models';

export interface GeneralStateInterface {
  accounts: Array<Account>;
  accountSelected: Account;
  categories: Array<Category>
}

function state(): GeneralStateInterface {
  return {
    accounts: [],
    accountSelected: <Account>{},
    categories: []
  }
};

export default state;
