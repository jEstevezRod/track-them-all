import {GetterTree} from 'vuex';
import {StateInterface} from '../index';
import {GeneralStateInterface} from './state';
import {GetterTypes} from 'src/store/general/getter-types';
import {Account, Category} from 'components/models';

const getters: GetterTree<GeneralStateInterface, StateInterface> = {
  [GetterTypes.ACCOUNTS](state: GeneralStateInterface): Array<Account> {
    return state.accounts
  },
  [GetterTypes.ACCOUNT_SELECTED](state: GeneralStateInterface): Account {
    console.log('getter')
    console.log(Object.keys(state.accountSelected).length)
    if (!Object.keys(state.accountSelected).length) {
      console.log('yes')
      console.log(state.accounts)
      return state.accounts[0]
    }
    return state.accountSelected
  },
  [GetterTypes.CATEGORIES](state: GeneralStateInterface): Array<Category> {
    return state.categories
  }
};

export default getters;
