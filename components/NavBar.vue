<template>
  <nav
    class="bg-[#393153] mb-15 min-w-full min-h-50 flex p-3 px-32 justify-between items-center"
  >
    <div class="text-xl font-extrabold text-white" style="font-family: Archivo">
      <nuxt-link to="/">LOGO</nuxt-link>
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
import toastr from 'toastr'
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-left',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '1000',
  extendedTimeOut: '500',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'show',
  hideMethod: 'fadeOut',
}
let user = ref({})
const { store } = useContext()
onMounted(() => {
  user.value = store.state.user
})
const router = useRouter()
const logout = () => {
  store.commit('setToken', '')
  store.commit('setAuth', false)
  toastr.info('You Have Been Logged Out!', 'LogOut')
  router.push({ path: '/' })
}
</script>
