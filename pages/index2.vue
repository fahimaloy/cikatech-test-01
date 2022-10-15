<script>
import { onMounted, reactive, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
const { $axios, store } = useContext()
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
  captcha.value = Math.floor(Math.random() * 90 + 10)
}
onMounted(() => {
  console.log(useContext())

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

            router.push({ path: '/members' })
          })
      })
      .catch((err) => {
        userDetails.user_account = ''
        userDetails.password = ''
        updateCaptcha()
        try {
          if (err.response.data.status === 'error') {
            console.log(err.response.data)
          }
        } catch {
          console.log('Error')
        }
      })
  } else {
    updateCaptcha()
  }
}
const pass = ref(false)
const togglePass = () => (pass.value = !pass.value)
</script>
<template>
  <div class="flex md:flex-row flex-col bg-[#1F1B2E]">
    <img
      src="/image1.png"
      class="md:min-h-screen md:w-5/12 w-screen h-32 bg-cover"
      alt=""
    />
    <div class="min-h-screen w-full my-auto p-12 flex flex-col justify-center">
      <form @submit.prevent="loginButtonClicked">
        <h1 class="text-white font-bold login-header my-3">Login</h1>
        <p class="text-white text-lg font-normal mb-3">
          Masuk dan dapatkan bonus tiap minggunya
        </p>
        <div
          class="grid grid-flow-row auto-rows-max grid-cols-1 gap-4 text-xs leading-3 md:text-sm md:leading-5"
        >
          <div class="p-5 bg-[#28223C] overflow-hidden flex rounded-lg w-full">
            <img src="/add-person.svg" class="w-7 h-7" />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1"
              v-model="userDetails.user_account"
              required
              placeholder="Username 6-16 karakter standar"
            />
          </div>

          <div class="p-5 bg-[#28223C] flex overflow-hidden rounded-lg w-full">
            <img src="/lock.svg" class="w-7 h-7" />
            <input
              :type="pass ? 'text' : 'password'"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1"
              v-model="userDetails.password"
              required
              placeholder="Password (6 karakter atau lebih)"
            />
            <img src="/eye.svg" class="ml-auto w-7" @click="togglePass" />
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
            class="bg-[#FD1A79] w-full my-1 p-3 text-white rounded-sm login-button"
          >
            Masuk
          </button>
          <p class="text-center text-white go-to-register">
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

<style scoped>
.login-header {
  font-family: Oswald;
  font-size: 72px;
  line-height: 106.7px;
}
.login-button {
  font-size: 22px;
  line-height: 33px;
  font-family: Poppins;
  font-weight: 700;
}
.go-to-register {
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
