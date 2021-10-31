import {MutationTree} from 'vuex';
import {GeneralStateInterface} from './state';
import {Account, Category} from 'components/models';
import {MutationTypes} from 'src/store/general/mutation-types';

const mutation: MutationTree<GeneralStateInterface> = {
  [MutationTypes.SET_ACCOUNTS](state: GeneralStateInterface, accounts: Array<Account>) {
    state.accounts = accounts
  },
  [MutationTypes.SET_CATEGORIES](state: GeneralStateInterface, categories: Array<Category>) {
    state.categories = categories
  },
  [MutationTypes.PICK_ACCOUNT](state: GeneralStateInterface, account: Account) {
    console.log('in mutation',account)
    state.accountSelected = account
  }

};

export default mutation;
