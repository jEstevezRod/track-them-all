import {MutationTree} from 'vuex';
import {GeneralStateInterface} from './state';
import {Account, Category, Transaction} from 'components/models';
import {MutationTypes} from 'src/store/general/mutation-types';
import {LocalStorage} from 'quasar'

const mutation: MutationTree<GeneralStateInterface> = {
    [MutationTypes.SET_ACCOUNTS](state: GeneralStateInterface, accounts: Array<Account>) {
      state.accounts = accounts
    },
    [MutationTypes.SET_CATEGORIES](state: GeneralStateInterface, categories: Array<Category>) {
      state.categories = categories
    },
    [MutationTypes.PICK_ACCOUNT](state: GeneralStateInterface, account: Account) {
      LocalStorage.set('account-selected', account)
      state.accountSelected = account
    },
    [MutationTypes.PICK_CATEGORY](state: GeneralStateInterface, category: Category) {
      state.categorySelected = category
    },
    [MutationTypes.CLEAN_CATEGORY_SELECTED](state: GeneralStateInterface) {
      state.categorySelected = <Category>{}
    },
    [MutationTypes.SET_TRANSACTIONS](state: GeneralStateInterface, transactions: Transaction[]) {
      state.transactions = transactions
    },
    [MutationTypes.SET_CATEGORIES_ALLOWED](state: GeneralStateInterface, categoriesAllowed: number[]) {
      state.categoriesAllowed = categoriesAllowed
    }
  }
;

export default mutation;
