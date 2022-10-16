<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
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
let banks = ref([])
const router = useRouter()
const { $axios } = useContext()
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
        toastr.success('Success', 'Successfully Registered User!')

        router.push({ path: '/' })
      })
      .catch((err) => {
        try {
          if (err.response.data.status === 'error') {
            toastr.error(err.response.data.message, err.response.data.status)
          }
        } catch {
          toastr.error('Some Error Occurred!', 'Error')
        }
      })
  } else {
    toastr.warning(
      'Please Type Same Password for both fields',
      'Passwords Does not match!'
    )
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
<template>
  <div class="flex md:flex-row flex-col h-screen w-screen bg-[#1F1B2E]">
    <img
      src="/image1.png"
      class="md:min-h-screen md:w-5/12 w-screen h-32 bg-cover"
      alt=""
    />
    <div
      class="min-h-screen w-full md:my-auto mx-auto p-12 flex flex-col justify-center"
    >
      <form @submit.prevent="submitButtonClicked">
        <h1 class="text-white my-4 register-text font-bold">Register</h1>
        <div
          class="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 gap-2 text-xs leading-3 md:text-sm md:leading-5"
        >
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/add-person.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none w-5/6 outline-none pl-1"
              v-model="userDetails.username"
              placeholder="Username 6-16 karakter standar"
              required
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/bank.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <select
              v-model="userDetails.bank_name"
              class="bg-[#28223C] mx-2 w-5/6 border-none text-white outline-none"
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
            <img
              src="/lock.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              :type="pass1 ? 'text' : 'password'"
              class="text-white bg-[#28223C] w-5/6 mx-2 border-none outline-none pl-1"
              v-model="userDetails.password"
              placeholder="Password (6 karakter atau lebih)"
              required
            />
            <img
              src="/eye.svg"
              height="28"
              width="28"
              class="input-icon"
              @click="togglePass1"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/document.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="number"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1 w-5/6"
              v-model="userDetails.account_number"
              placeholder="No Rekening"
              required
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/lock.svg" height="28" width="28" class="input-icon" />
            <input
              :type="pass2 ? 'text' : 'password'"
              class="text-white bg-[#28223C] w-full mx-2 border-none outline-none pl-1"
              v-model="confirmpass"
              placeholder="Password sekali lagi"
              required
            />
            <img
              src="/eye.svg"
              height="28"
              width="28"
              class="input-icon"
              @click="togglePass2"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/document.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1 w-5/6"
              v-model="userDetails.account_name"
              placeholder="Nama Rekening"
              required
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/inbox.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="email"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1 w-5/6"
              v-model="userDetails.email"
              placeholder="Email"
              required
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/document.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1 w-5/6"
              v-model="userDetails.referral_username"
              placeholder="Username Referal (bila ada)"
            />
          </div>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img
              src="/smartphone.svg"
              height="28"
              width="28"
              class="input-icon"
              alt=""
            />
            <input
              type="tel"
              class="text-white bg-[#28223C] mx-2 border-none outline-none pl-1 w-5/6"
              v-model="userDetails.phone"
              placeholder="Telepon"
              required
            />
          </div>
        </div>
        <div class="footer my-3">
          <button
            type="submit"
            class="bg-[#FD1A79] w-full my-1 p-3 text-white rounded-lg register-button"
          >
            Register
          </button>
          <p class="text-center text-white mt-1 mb-10 go-to-login">
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

<style scoped>
.register-text {
  font-family: Oswald;
  font-size: 72px;
  line-height: 106.7px;
}
.input-icon {
  height: 28px !important;
  width: 28px !important;
}
.register-button {
  font-size: 22px;
  line-height: 33px;
  font-family: Poppins;
  font-weight: 700;
}
.go-to-login {
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
