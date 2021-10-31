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
          <q-chip clickable ripple class="glossy" color="light-blue-5" text-color="white">
            {{ category.name }}
          </q-chip>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center q-mt-xl">
      <q-btn size="35px" round color="teal" icon="done" @click="storeAmount"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useStore} from 'src/store';
import {ActionTypes} from 'src/store/general/action-types';
import {GetterTypes} from 'src/store/general/getter-types';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const store = useStore()
    const amountSpent = ref(null)
    onMounted(() => {
      void store.dispatch(`generalModule/${ActionTypes.GET_ALL_CATEGORIES}`)
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const accountSelected = computed(() => store.getters[`generalModule/${GetterTypes.ACCOUNT_SELECTED}`])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const categories = computed(() => store.getters[`generalModule/${GetterTypes.CATEGORIES}`])

    const storeAmount = () => {
      console.log(amountSpent.value)
      console.log(accountSelected.value)
      // void store.dispatch(`generalModule/${ActionTypes.STORE_TRANSACTION}`)
    }

    return {
      amountSpent,
      storeAmount,
      categories,
      accountSelected
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
  padding: 30px 15px;
}

.account-box {
  padding: 20px;
  background-color: #d7d7d7;
  border-radius: 5px;
}

.glossy {
  width: 160px;

  .q-chip__content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
