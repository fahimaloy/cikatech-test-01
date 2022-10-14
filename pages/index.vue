<template>
  <div class="flex bg-cover bg-[#1F1B2E]">
    <img src="/image1.png" class="min-h-screen w-5/12" alt="" />
    <div class="min-h-screen w-full my-auto p-12 flex flex-col">
      <h1 class="text-white text-7xl my-1 login-header my-3">Login</h1>
      <p class="text-white mb-3">Masuk dan dapatkan bonus tiap minggunya</p>
      <div class="grid grid-flow-row auto-rows-max grid-cols-1 gap-4">
        <div class="p-5 bg-[#28223C] flex rounded-lg">
          <img src="/add-person.svg" alt="" />
          <input
            type="text"
            class="text-white bg-[#28223C] mx-2 w-full border-none outline-none"
            v-model="userDetails.user_account"
            placeholder="Username 6-16 karakter standar"
          />
        </div>

        <div class="p-5 bg-[#28223C] flex rounded-lg">
          <img src="/lock.svg" alt="" />
          <input
            :type="pass ? 'text' : 'password'"
            class="text-white bg-[#28223C] mx-2 w-full border-none outline-none"
            v-model="userDetails.password"
            placeholder="Password (6 karakter atau lebih)"
          />
          <img src="/eye.svg" @click="togglePass" />
        </div>
        <div class="bg-[#28223C] flex rounded-lg">
          <div class="bg-[#5B32FD] p-5 flex text-white">
            <p class="px-2 border-r border-gray-300">Captcha</p>
            <p class="mx-1">{{ captcha }}</p>
          </div>
          <input
            type="text"
            class="p-5 text-white bg-[#28223C] w-full mx-2 border-none outline-none"
            v-model="writtenCaptcha"
            placeholder="Enter this code here"
          />
        </div>
      </div>
      <div class="footer my-3">
        <button
          @click="loginButtonClicked"
          class="bg-[#FD1A79] w-full my-1 p-3 text-white rounded-sm"
        >
          Login
        </button>
        <p class="text-center text-white">
          Belum punya account?
          <nuxt-link to="/register" class="list-none text-[#FD1A79]">
            Daftar disini</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
const { $axios, $toast, store } = useContext()
let captcha = ref(0)
const router = useRouter()
const loginUrl = 'https://member-api.cktch.top/api/v1/login'
const writtenCaptcha = ref('')
const userDetails = reactive({
  user_account: '',
  password: '',
})
const updateCaptcha = () => {
  writtenCaptcha.value = ''
  captcha.value = Math.floor(Math.random() * 1000 + 1)
}
onMounted(() => {
  updateCaptcha()
})
const loginButtonClicked = () => {
  if (writtenCaptcha.value == captcha.value) {
    $axios
      .$post(loginUrl, userDetails)
      .then((res) => {
        store.commit('setToken', res.data.token)
        store.commit('setAuth', true)
        $toast.show('Successfully Logged In', {
          theme: 'toasted-primary',
          type: 'error',
          className: 'w-full bg-green-700 rounded-lg p-3 h-16',
          fitToScreen: true,
          keepOnHover: true,
          position: 'top-right',
          duration: 5000,
        })
        router.push({ path: '/members' })
      })
      .catch((err) => {
        updateCaptcha()
        if (err.response.data.status === 'error') {
          $toast.show(err.response.data.message, {
            theme: 'toasted-primary',
            type: 'error',
            className: 'w-full bg-red-700 rounded-lg p-3 h-16',
            fitToScreen: true,
            keepOnHover: true,
            position: 'top-right',
            duration: 3000,
          })
        } else {
          $toast.show('Some Problem Occurred!', {
            theme: 'toasted-primary',
            type: 'error',
            className: 'w-full bg-red-700 rounded-lg p-3 h-16',
            fitToScreen: true,
            keepOnHover: true,
            position: 'top-right',
            duration: 3000,
          })
        }
      })
  } else {
    updateCaptcha()
    $toast.show('Wrong Captcha', {
      theme: 'toasted-primary',
      type: 'error',
      className: 'w-full bg-green-700 rounded-lg p-3 h-16',
      fitToScreen: true,
      keepOnHover: true,
      position: 'top-right',
      duration: 3000,
    })
  }
}
const pass = ref(false)
const togglePass = () => (pass.value = !pass.value)
</script>
<style scoped>
.login-header {
  font-family: Oswald;
}
</style>
