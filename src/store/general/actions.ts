import {ActionTree} from 'vuex';
import {StateInterface} from '../index';
import {GeneralStateInterface} from './state';
import AccountService from 'src/services/AccountService';
import {MutationTypes} from 'src/store/general/mutation-types';
import {ActionTypes} from 'src/store/general/action-types';
import CategoryService from 'src/services/CategoryService';
import {Account, Transaction, TransactionStatus} from 'components/models';
import TransactionService from 'src/services/TransactionService';

const actions: ActionTree<GeneralStateInterface, StateInterface> = {

	[ActionTypes.GET_ALL]({commit}) {
		return new Promise(((resolve, reject) => {
			AccountService.getAll()
				.then(response => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					commit(MutationTypes.SET_ACCOUNTS, response.data)
				})
				.catch(error => {
					reject(error)
				})
		}))
	},
	[ActionTypes.GET_ALL_CATEGORIES]({commit}) {
		return new Promise(((resolve, reject) => {
			CategoryService.getAll()
				.then(response => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					commit(MutationTypes.SET_CATEGORIES, response.data)
				})
				.catch(error => {
					reject(error)
				})
		}))
	},

	[ActionTypes.PICK_ACCOUNT]({commit}, account: Account) {
		return new Promise((resolve => {
			commit(MutationTypes.PICK_ACCOUNT, account)
			resolve(true)
		}))
	},

	[ActionTypes.STORE_TRANSACTION]({commit}, transaction: Transaction) {
		commit(MutationTypes.CHANGE_TRANSACTION_STATUS, TransactionStatus.BEING_PROCESSED)
		return new Promise(((resolve, reject) => {
			TransactionService.store(transaction)
				.then(() => {
					commit(MutationTypes.CHANGE_TRANSACTION_STATUS, TransactionStatus.PROCESS_CORRECTLY)
					resolve(true)
				})
				.catch(error => {
					commit(MutationTypes.CHANGE_TRANSACTION_STATUS, TransactionStatus.PROCESS_FAILED)
					reject(error)
				})

		}))
	},

	[ActionTypes.GET_ALL_TRANSACTIONS]({commit}, account: Account) {
		return new Promise((resolve => {
			TransactionService.getAll(account)
				.then(response => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
					// @ts-ignore
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
					commit(MutationTypes.SET_TRANSACTIONS, sortKeys(response.data) as Transaction[])
					resolve(true)
				})
				.catch(error => {
					console.error(error)
				})
		}))
	}

};

export default actions;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function sortKeys(obj_1) {
	let i;
	const key = Object.keys(obj_1)
		.map(key => {
			return key.toString()
		})
		.reverse()
	// .sort(function order(key1, key2) {
	//   if (key1 < key2) return -1;
	//   else if (key1 > key2) return +1;
	//   else return 0;
	// })
	// Taking the object in 'temp' object
	// and deleting the original object.
	const temp = {};

	for (i = 0; i < key.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		temp[key[i]] = obj_1[key[i]];
		delete obj_1[key[i]];
	}

	// Copying the object from 'temp' to
	// 'original object'.
	for (i = 0; i < key.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		obj_1[key[i].toString() + ' '] = temp[key[i]];
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return obj_1;
}
