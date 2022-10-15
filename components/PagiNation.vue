<template>
  <div class="flex justify-center items-center">
    <div
      v-for="(page, index) in pages"
      :key="page.label"
      @click="$emit('pagination-click', page.link)"
    >
      <img
        v-if="index == 0"
        src="/left.svg"
        class="p-3 mx-1 rounded-full h-9 w-9 border border-solid border-[#393153] cursor-pointer"
      />

      <img
        src="/right.svg"
        v-else-if="index == pages.length - 1"
        class="p-3 mx-1 rounded-full h-9 w-9 border border-solid border-[#393153] cursor-pointer"
      />

      <button
        v-else
        class="mx-1 rounded-full p-2"
        :class="
          page.active
            ? 'bg-[#5B32FD] h-14 w-14 font-extrabold text-white '
            : 'bg-[#393153] text-[#8262D4] h-10 w-10 cursor-pointer'
        "
      >
        {{ page.label }}
      </button>
    </div>
  </div>
</template>
<script setup>
// import { toRefs } from 'vue'

import { computed } from 'vue'

const props = defineProps({ pages: Array })
// const pages = toRefs(props)
const pages = computed(() => props.pages)
console.log(pages)
</script>
