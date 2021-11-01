import {GetterTree} from 'vuex';
import {StateInterface} from '../index';
import {GeneralStateInterface} from './state';
import {GetterTypes} from 'src/store/general/getter-types';
import {Account, Category, CategoryOption, Transaction, TransactionStatus} from 'components/models';
import {LocalStorage} from 'quasar'

const getters: GetterTree<GeneralStateInterface, StateInterface> = {
	[GetterTypes.ACCOUNTS](state: GeneralStateInterface): Array<Account> {
		return state.accounts
	},
	[GetterTypes.ACCOUNT_SELECTED](state: GeneralStateInterface): Account {
		if (LocalStorage.has('account-selected')) {
			console.log('Exist account in LocalStore, lets restore it')
			return LocalStorage.getItem('account-selected') as Account
		}

		return state.accountSelected
	},
	[GetterTypes.CATEGORIES](state: GeneralStateInterface): Array<Category> {
		return state.categories
	},
	[GetterTypes.CATEGORIES_OPTIONS](state: GeneralStateInterface): Array<CategoryOption> {
		return state.categories.map((category: Category) => {
			return {
				value: category.id,
				label: category.name
			} as CategoryOption
		})
	},
	[GetterTypes.CATEGORY_SELECTED](state: GeneralStateInterface): Category {
		return state.categorySelected
	},
	[GetterTypes.CATEGORIES_ALLOWED](state: GeneralStateInterface): number[] {
		return state.categoriesAllowed
	},
	[GetterTypes.CATEGORIES_DEFAULT_ALLOWED](state: GeneralStateInterface): number[] {
		return state.categoriesDefaultAllowed
	},
	[GetterTypes.TRANSACTION_STATUS](state: GeneralStateInterface): TransactionStatus {
		return state.transactionStatus
	},
	[GetterTypes.TRANSACTIONS](state: GeneralStateInterface): Transaction[] {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const trans = JSON.parse(JSON.stringify(state.transactions))
		for (const [year, months] of Object.entries(state.transactions)) {
			// eslint-disable-next-line prefer-const
			for (let [month, transactionList] of Object.entries(months)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
				trans[year][month] = transactionList.filter((transaction: Transaction): boolean => {
					return state.categoriesAllowed.includes(transaction.category_id)
				})
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return trans
	}
	// [GetterTypes.TRANSACTIONS](state: GeneralStateInterface): Transaction[] {
	//   return state.transactions
	// }
};

export default getters;
