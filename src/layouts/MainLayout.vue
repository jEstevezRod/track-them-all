<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer>
      <q-tabs
        v-model="tabSelected"
        indicator-color="transparent"
        active-color="white"
        class="blue-8 text-grey-5 shadow-2"
      >
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="history" icon="view_list" to="/transactions"/>
        <q-route-tab name="account" icon="account_balance" to="/account"/>
        <q-route-tab name="report" icon="analytics" to="/report"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'MainLayout',


  setup() {
    const tabSelected = ref('account')
    return {
      tabSelected,
    }
  }
})
</script>
<style lang="scss">
.main-layout {
  background-color: #252525;
  color: #fff;
}
</style>
