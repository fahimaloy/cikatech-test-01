<template>
  <nav
    class="bg-[#393153] min-h-50 flex p-3 px-32 justify-between items-center"
  >
    <div class="text-5xl text-white">LOGO</div>
    <div class="flex">
      <div class="flex flex-col text-white mx-5">
        <p>Username</p>
        <p class="text-gray-400">Email</p>
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
import { useContext, useRouter } from '@nuxtjs/composition-api'

const { store, $toast } = useContext()
const router = useRouter()
const logout = () => {
  store.commit('setToken', '')
  store.commit('setAuth', false)
  $toast.show('Successfully Logged Out', {
    theme: 'toasted-primary',
    type: 'error',
    className: 'w-full bg-blue-700 rounded-lg h-16',
    fitToScreen: true,
    keepOnHover: true,
    position: 'top-right',
    duration: 5000,
  })
  router.push({ path: '/' })
}
</script>
