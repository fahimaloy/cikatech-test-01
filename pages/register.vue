<template>
  <div class="flex md:flex-row flex-col h-screen w-screen bg-[#1F1B2E]">
    <img
      src="/image1.png"
      class="md:min-h-screen md:w-5/12 w-screen h-32 bg-cover"
      alt=""
    />
    <div class="min-h-screen w-full md:my-auto mx-auto p-12 flex flex-col">
      <form @submit.prevent="submitButtonClicked">
        <h1 class="text-white text-7xl my-4 register-text">Register</h1>
        <div
          class="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 gap-2 text-xs leading-3 md:text-sm md:leading-5"
        >
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/add-person.svg" alt="" />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none w-full outline-none"
              v-model="userDetails.username"
              placeholder="Username 6-16 karakter standar"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/bank.svg" alt="" />
            <select
              v-model="userDetails.bank_name"
              class="bg-[#28223C] mx-2 w-full border-none outline-none"
              :class="
                userDetails.bank_name == 0 ? 'text-[#9ca3af]' : 'text-white'
              "
            >
              <option value="0" class="text-[#9ca3af]" disabled>
                Pilih Bank
              </option>

              <option
                v-for="bank in banks"
                :key="bank.id"
                class="p-2 max-w-full"
                :value="bank.id"
              >
                {{ bank.name }}
              </option>
            </select>
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/lock.svg" alt="" />
            <input
              :type="pass1 ? 'text' : 'password'"
              class="text-white bg-[#28223C] w-full mx-2 border-none outline-none"
              v-model="userDetails.password"
              placeholder="Password (6 karakter atau lebih)"
            />
            <img src="/eye.svg" @click="togglePass1" />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/document.svg" alt="" />
            <input
              type="number"
              class="text-white bg-[#28223C] mx-2 border-none outline-none w-full"
              v-model="userDetails.account_number"
              placeholder="No Rekening"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/lock.svg" />
            <input
              :type="pass2 ? 'text' : 'password'"
              class="text-white bg-[#28223C] w-full mx-2 border-none outline-none"
              v-model="confirmpass"
              placeholder="Password sekali lagi"
            />
            <img src="/eye.svg" @click="togglePass2" />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/document.svg" alt="" />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none w-full"
              v-model="userDetails.account_name"
              placeholder="Nama Rekening"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/inbox.svg" alt="" />
            <input
              type="email"
              class="text-white bg-[#28223C] mx-2 border-none outline-none w-full"
              v-model="userDetails.email"
              placeholder="Email"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/document.svg" alt="" />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none w-full"
              v-model="userDetails.referral_username"
              placeholder="Username Referal (bila ada)"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/smartphone.svg" alt="" />
            <input
              type="tel"
              class="text-white bg-[#28223C] mx-2 border-none outline-none w-full"
              v-model="userDetails.phone"
              placeholder="Telepon"
            />
          </div>
        </div>
        <div class="footer my-3">
          <button
            type="submit"
            class="bg-[#FD1A79] w-full my-1 p-3 text-white rounded-lg"
          >
            Register
          </button>
          <p class="text-center text-white mt-1 mb-10">
            Sudah punya account?
            <nuxt-link to="/" class="list-none text-[#FD1A79]">
              Login disini</nuxt-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
let banks = ref([])
const router = useRouter()
const { $axios, $toast } = useContext()
let confirmpass = ref([])
const bankListUrl = 'https://member-api.cktch.top/api/v1/bank/bank_wd'
const registerUrl = 'https://member-api.cktch.top/api/v1/register'
const userDetails = reactive({
  username: '',
  password: '',
  bank_name: '0',
  email: '',
  phone: '',
  referral_username: '',
  account_name: '',
  account_number: '',
})
const submitButtonClicked = () => {
  console.log(confirmpass.value + '  ' + userDetails.password)
  if (confirmpass.value === userDetails.password) {
    $axios
      .$post(registerUrl, userDetails)
      .then((res) => {
        $toast.show('Successfully Registered User', {
          theme: 'toasted-primary',
          type: 'error',
          className: 'w-full bg-green-700 rounded-lg font-bold p-3 h-16',

          keepOnHover: true,
          position: 'top-center',
          icon: 'close',
          duration: 5000,
        })
        router.push({ path: '/' })
      })
      .catch((err) => {
        try {
          if (err.response.data.status == 'error') {
            $toast.show(err.response.data.message, {
              theme: 'toasted-primary',
              type: 'error',
              className: 'w-full bg-red-900 rounded-lg font-bold p-3 h-16',

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
            className: 'w-full bg-red-900 rounded-lg font-bold p-3 h-16',

            keepOnHover: true,
            position: 'top-center',
            icon: 'close',
            duration: 3000,
          })
        }
      })
  } else {
    $toast.show('Passwords Are Not Same!', {
      theme: 'toasted-primary',
      type: 'error',
      className: 'w-full bg-blue-700 rounded-lg font-bold p-3 h-16',

      keepOnHover: true,
      position: 'top-center',
      icon: 'close',
      duration: 3000,
    })
  }
}

onMounted(() => {
  const config = {
    headers: {
      secret: 'secret',
    },
  }
  $axios.$get(bankListUrl, config).then((res) => {
    banks.value = res.data.bank.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.id === arr.id && t.name === arr.name)
    )
  })
})

const pass1 = ref(false)
const pass2 = ref(false)
const togglePass1 = () => (pass1.value = !pass1.value)
const togglePass2 = () => (pass2.value = !pass2.value)
</script>
<style scoped>
.register-text {
  font-family: Oswald;
}
</style>
