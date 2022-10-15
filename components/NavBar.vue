<template>
  <nav
    class="bg-[#393153] container mb-15 min-w-full min-h-50 flex p-3 px-32 justify-between items-center"
  >
    <div class="text-5xl text-white" style="font-family: Archivo">
      <a href="/">LOGO</a>
    </div>
    <div class="flex">
      <div class="flex flex-col text-white mx-5">
        <p>{{ user.username }}</p>
        <p class="text-gray-400">{{ user.email }}</p>
      </div>
      <button
        @click="logout"
        class="bg-[#E95750] p-1 w-32 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, ref, useContext, useRouter } from '@nuxtjs/composition-api'
let user = ref({})
const { store, $toast } = useContext()
onMounted(() => {
  user.value = store.state.user
})
const router = useRouter()
const logout = () => {
  store.commit('setToken', '')
  store.commit('setAuth', false)
  $toast.show('Successfully Logged Out', {
    theme: 'toasted-primary',
    type: 'error',
    className: 'w-full bg-blue-700 rounded-lg h-16',

    keepOnHover: true,
    position: 'top-center',
    icon: 'close',
    duration: 5000,
  })
  router.push({ path: '/' })
}
</script>
