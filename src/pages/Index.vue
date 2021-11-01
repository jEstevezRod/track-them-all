<template>
  <q-page>
    <div v-if="accountSelected" class="account-container">
      <div class="account-box">
        {{ accountSelected.name }}
      </div>
    </div>
    <div class="flex justify-center items-center">
      <q-input borderless autofocus input-class="align-end" type="number" dark v-model="amountSpent" class="custom-box">
        <template v-slot:append>
          <q-icon name="euro" class="euro-icon"/>
        </template>
      </q-input>
    </div>

    <div class="row">
      <div v-for="category of categories" :key="category.id" class="col-6">
        <div class="flex justify-center">
          <q-chip
            clickable
            ripple
            square
            class="tags"
            :text-color="categoryTextColor(category)"
            :color="categoryColor(category)"
            @click="pickCategory(category)"
          >
            {{ category.name }}
          </q-chip>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center q-mt-md">
      <q-btn size="25px" round color="blue-8" icon="done" @click="storeAmount"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useStore} from 'src/store';
import {ActionTypes} from 'src/store/general/action-types';
import {GetterTypes} from 'src/store/general/getter-types';
import {Account, Category, Transaction} from 'src/components/models';
import TransactionService from 'src/services/TransactionService';
import {MutationTypes} from 'src/store/general/mutation-types';
import {useQuasar} from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const store = useStore()
    const $q = useQuasar()
    let amountSpent = ref()

    onMounted(() => {
      void store.dispatch(`generalModule/${ActionTypes.GET_ALL_CATEGORIES}`)
    })

    const categories = computed(() => <Category[]>store.getters[`generalModule/${GetterTypes.CATEGORIES}`])
    const categorySelected = computed(() => <Category>store.getters[`generalModule/${GetterTypes.CATEGORY_SELECTED}`])
    const accountSelected = computed(() => <Account>store.getters[`generalModule/${GetterTypes.ACCOUNT_SELECTED}`])

    const pickCategory = (category: Category) => {
      void store.commit(`generalModule/${MutationTypes.PICK_CATEGORY}`, category)
    }
    const categoryColor = (category: Category) => {
      if (!Object.keys(categorySelected.value).length) {
        return 'blue-8'
      }
      return categorySelected.value === category ? 'blue-8' : 'grey-4'
    }
    const categoryTextColor = (category: Category) => {
      if (!Object.keys(categorySelected.value).length) {
        return 'white'
      }
      return categorySelected.value === category ? 'white' : 'black'
    }

    const storeAmount = () => {
      if (!allFieldsAreCorrect()) {
        return
      }
      const transaction: Transaction = TransactionService.createFromAggregates(
        amountSpent.value,
        accountSelected.value,
        categorySelected.value
      )
      console.log(transaction)
      void store.dispatch(`generalModule/${ActionTypes.STORE_TRANSACTION}`, transaction)
        .then(() => {
          showFeedback()
          resetValues()
        })
    }

    const allFieldsAreCorrect = () => {
      if (!amountSpent.value) {
        $q.notify({type: 'warning', message: 'Need to insert an amount'})
        return false
      }
      if (!Object.keys(categorySelected.value).length) {
        $q.notify({type: 'warning', message: 'Need to pick a category'})
        return false
      }
      if (!Object.keys(accountSelected.value).length) {
        $q.notify({type: 'warning', message: 'Need to choose an account'})
        return false
      }
      return true
    }

    const resetValues = () => {
      amountSpent.value = ref()
      void store.commit(`generalModule/${MutationTypes.CLEAN_CATEGORY_SELECTED}`)
    }
    const showFeedback = () => {
      $q.notify({type: 'positive', message: 'Transaction stored.'})
    }

    return {
      amountSpent,
      storeAmount,
      categories,
      accountSelected,
      pickCategory,
      categoryColor,
      categoryTextColor
    };
  }
});
</script>

<style lang="scss">

.cajita {
  padding: 10px;
  background-color: #d7d7d7;
  border-radius: 5px;
}

.align-end {
  text-align: end !important;

}

.custom-box {
  font-size: 100px;
  padding: 40px;
  color: #ffffff !important;
}

.q-field__control {
  height: 100px !important;
}

.euro-icon {
  font-size: 70px;
  color: #fff;
}

.q-field__append {
  align-items: end !important;
  height: 100% !important;
  justify-content: center !important;
}

.account-container {
  padding: 15px;
}

.account-box {
  padding: 13px;
  background-color: #008aed;
  border-radius: 5px;
  color: #efefef;
}

.tags {
  width: 160px;
  padding-top: 17px;
  padding-bottom: 17px;
  .q-chip__content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
