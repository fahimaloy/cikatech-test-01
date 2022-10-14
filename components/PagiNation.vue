<template>
  <ul class="flex">
    <li v-for="page in pages" :key="page.url">
      <button
        @click="pageClick(page.url)"
        class="rounded-xl bg-blue text-white"
      >
        {{ page.label }}
      </button>
    </li>
  </ul>
</template>
<script setup>
import { reactive, useContext } from '@nuxtjs/composition-api'

// let pages = defineProps(['pages'])
const { store } = useContext()
const pages = reactive(store.state.pages)
const pageClick = (url) => {}
</script>
