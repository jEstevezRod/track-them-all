import {ActionTree} from 'vuex';
import {StateInterface} from '../index';
import {GeneralStateInterface} from './state';
import AccountService from 'src/services/AccountService';
import {MutationTypes} from 'src/store/general/mutation-types';
import {ActionTypes} from 'src/store/general/action-types';
// import TransactionService from 'src/services/TransactionService';
import CategoryService from 'src/services/CategoryService';
import {Account} from "components/models";

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
      console.log('action', account)
      commit(MutationTypes.PICK_ACCOUNT, account)
    }))
  }

  // [ActionTypes.STORE_TRANSACTION]({commit}, payload) {
  //
  //   return new Promise(((resolve, reject) => {
  //
  //     TransactionService.store(payload)
  //       .then(response => {
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //
  //   }))
  // }

};

export default actions;
