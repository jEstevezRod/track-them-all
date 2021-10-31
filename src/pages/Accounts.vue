<template>
  <q-page>
    <q-header >
      <q-toolbar>
        <q-toolbar-title>
        Accounts
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div>
      <q-list padding class="rounded-borders">
        <q-item v-for="acc of accounts" :key="acc.id" @click="pickAccount(acc)" clickable v-ripple>
          <q-item-section>
            {{ acc.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </q-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed} from 'vue';
import {useStore} from 'src/store';
import {ActionTypes} from 'src/store/general/action-types';
import {GetterTypes} from 'src/store/general/getter-types';
import {Account} from 'components/models';

export default defineComponent({
  name: 'AccountIndex',
  setup() {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const accounts = computed(() => store.getters[`generalModule/${GetterTypes.ACCOUNTS}`])

    const pickAccount = (account: Account) => {
      void store.dispatch(`generalModule/${ActionTypes.PICK_ACCOUNT}`, account)
    }

    onMounted(() => {
      void store.dispatch(`generalModule/${ActionTypes.GET_ALL}`)
    })


    return {accounts, pickAccount};
  }
});
</script>
