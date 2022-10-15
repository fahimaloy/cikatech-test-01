<template>
  <nav
    class="bg-[#393153] container mb-15 min-w-full min-h-50 flex p-3 px-32 justify-between items-center"
  >
    <div class="text-xl font-extrabold text-white" style="font-family: Archivo">
      <a href="/">LOGO</a>
    </div>
    <div class="flex">
      <div class="flex flex-col text-sm user-details text-white mx-5">
        <p>{{ user.username }}</p>
        <p class="text-[#858585] text-xs">{{ user.email }}</p>
      </div>
      <button
        @click="logout"
        class="bg-[#E95750] p-1 logout font-['Roboto'] text-base text-center text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
<style scoped>
.text-xl {
  font-size: 24px;
  line-height: 22px;
}
.user-details {
  font-family: Roboto;
}
.logout {
  width: 120px;
}
</style>
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
