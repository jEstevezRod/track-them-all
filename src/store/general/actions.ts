import {ActionTree} from 'vuex';
import {StateInterface} from '../index';
import {GeneralStateInterface} from './state';
import AccountService from 'src/services/AccountService';
import {MutationTypes} from 'src/store/general/mutation-types';
import {ActionTypes} from 'src/store/general/action-types';
import CategoryService from 'src/services/CategoryService';
import {Account, Transaction} from 'components/models';
import TransactionService from 'src/services/TransactionService';

const actions: ActionTree<GeneralStateInterface, StateInterface> = {

  [ActionTypes.GET_ALL]({commit}) {
    return new Promise(((resolve, reject) => {
      AccountService.getAll()
        .then(response => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log(response.data)
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
          console.log(response.data)
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

  [ActionTypes.STORE_TRANSACTION]({}, transaction: Transaction) {
    return new Promise(((resolve, reject) => {
      TransactionService.store(transaction)
        .then(response => {
          console.log(response.data)
          resolve(true)
        })
        .catch(error => {
          reject(error)
        })

    }))
  },

  [ActionTypes.GET_ALL_TRANSACTIONS]({commit}, accountId: string) {
    return new Promise((resolve => {
      TransactionService.getAll(accountId)
        .then(response => {
          console.log('transactions',response.data)
          commit(MutationTypes.SET_TRANSACTIONS, response.data as Transaction[])
          resolve(true)
        })
        .catch(error => {
          console.error(error)
        })
    }))
  }

};

export default actions;
