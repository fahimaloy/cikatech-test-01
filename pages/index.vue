<template>
  <div class="flex md:flex-row flex-col bg-[#1F1B2E]">
    <img
      src="/image1.png"
      class="md:min-h-screen md:w-5/12 w-screen h-32 bg-cover"
      alt=""
    />
    <div class="min-h-screen w-full my-auto p-12 flex flex-col">
      <form @submit.prevent="loginButtonClicked">
        <h1 class="text-white text-7xl login-header my-3">Login</h1>
        <p class="text-white text-lg mb-3">
          Masuk dan dapatkan bonus tiap minggunya
        </p>
        <div
          class="grid grid-flow-row auto-rows-max grid-cols-1 gap-4 text-xs leading-3 md:text-sm md:leading-5"
        >
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
            <div
              class="bg-[#5B32FD] p-3 md:p-5 flex items-center text-white rounded-l-lg"
            >
              <p class="px-1 md:px-2 text-sm md:text-lg">Captcha</p>
              <p class="border-r border-white h-7 mx-2"></p>
              <p class="mx-1 text-xl md:text-3xl">{{ captcha }}</p>
            </div>
            <input
              type="number"
              class="p-5 text-white bg-[#28223C] w-full mx-2 border-none outline-none"
              v-model="writtenCaptcha"
              placeholder="Enter this code here"
            />
          </div>
        </div>
        <div class="footer my-3">
          <button
            type="submit"
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
      </form>
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
let userDetails = reactive({
  user_account: '',
  password: '',
})
const updateCaptcha = () => {
  writtenCaptcha.value = ''
  captcha.value = Math.floor(Math.random() * 1000 + 1)
}
onMounted(() => {
  updateCaptcha()
  setInterval(() => {
    updateCaptcha()
  }, 60000)
})
const loginButtonClicked = () => {
  if (writtenCaptcha.value == captcha.value) {
    $axios
      .$post(loginUrl, userDetails)
      .then((res) => {
        store.commit('setToken', res.data.token)
        store.commit('setAuth', true)
        $axios
          .$get('https://member-api.cktch.top/api/v1/member', {
            headers: { Authorization: `Bearer ${res.data.token}` },
          })
          .then((res) => {
            store.commit('setUser', {
              username: res.data.username,
              email: res.data.email,
            })
            $toast.show('Successfully Logged In', {
              theme: 'toasted-primary',
              type: 'error',
              className: 'bg-green-700 rounded-lg font-bold p-3 h-16',

              keepOnHover: true,
              position: 'top-center',
              icon: 'close',
              duration: 3000,
            })
            router.push({ path: '/members' })
          })
      })
      .catch((err) => {
        userDetails.user_account = ''
        userDetails.password = ''
        updateCaptcha()
        try {
          if (err.response.data.status === 'error') {
            $toast.show(err.response.data.message, {
              theme: 'toasted-primary',
              type: 'error',
              className: 'bg-red-900 rounded-lg font-bold p-3 h-16',

              keepOnHover: true,
              position: 'top-center',
              icon: 'close',
              duration: 3000,
            })
          }
        } catch {
          $toast.show('Some Problem Occurred!', {
            theme: 'toasted-primary',
            type: 'error',
            className: 'bg-red-900 font-bold rounded-lg p-3 h-16',

            keepOnHover: true,
            position: 'top-center',
            icon: 'close',
            duration: 3000,
          })
        }
      })
  } else {
    updateCaptcha()
    $toast.show('Wrong Captcha', {
      theme: 'toasted-primary',
      type: 'error',
      className: 'bg-blue-700 rounded-lg p-3 h-16 font-bold',
      keepOnHover: true,
      position: 'top-center',
      duration: 3000,
      icon: 'close',
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
