<script setup>
import { onMounted, ref } from 'vue'
import { useContext, useRouter, useRoute } from '@nuxtjs/composition-api'
import toastr from 'toastr'
import NavBar from '../components/NavBar.vue'
const { $axios, store } = useContext()
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
let user = ref({})
const router = useRouter()
const route = useRoute()
const bankListUrl = 'https://member-api.cktch.top/api/v1/bank/bank_wd'
onMounted(() => {
  const config = {
    headers: {
      secret: 'secret',
    },
  }
  user.value = route.value.query.user
  $axios.$get(bankListUrl, config).then((res) => {
    banks.value = res.data.bank.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.id === arr.id && t.name === arr.name)
    )
    for (let i = 0; i < banks.value.length; i++) {
      if (banks.value[i].name == user.value.name_bank) {
        user.value.name_bank = banks.value[i].id
      }
    }
  })
})

const backButtonClicked = () => {
  router.push({ path: '/members' })
}
const update = () => {
  const payload = {
    email: user.value.email,
    id: user.value.id,
    phone: user.value.phone,
    bank_name: user.value.name_bank,
  }
  const url = 'https://member-api.cktch.top/api/v1/member/updateAccount'
  const token = store.state.token

  $axios
    .post(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      toastr.success('Successfully Editted User!', 'Success')
      router.push({ path: '/members' })
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
}
</script>

<template>
  <div class="bg-[#1F1B2E] w-full min-h-screen">
    <NavBar />
    <div class="container flex justify-center items-center mx-auto my-10">
      <div class="grid grid-cols-1 gap-14">
        <h1 class="heading-text text-[#FD1A79]">
          Update Member: {{ user.username }}
        </h1>
        <div class="flex flex-col">
          <p class="text-white label text-left">Username</p>
          <div class="pl-5 mt-2 bg-[#28223C] flex input-div input-text">
            <img src="/add-person.svg" alt="" />
            <input
              aria-disabled="true"
              v-model="user.username"
              type="text"
              class="text-[#FDD032] input-text placeholder:text-[#FDD032] bg-[#28223C] mx-2 border-none outline-none"
              disabled
              placeholder="username1 (readonly)"
              required
            />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-white label">Bank</p>
          <div class="pl-5 mt-2 bg-[#28223C] flex input-div">
            <img src="/bank.svg" alt="" />
            <!-- v-model="userDetails.bank_name" -->
            <select
              v-model="user.name_bank"
              required
              class="text-white input-text bg-[#28223C] mx-2 w-full border-none outline-none"
            >
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
        </div>
        <div class="flex flex-col">
          <p class="text-white label">Email</p>
          <div class="pl-5 mt-2 bg-[#28223C] flex input-div">
            <img src="/inbox.svg" alt="" />
            <input
              v-model="user.email"
              required
              type="text"
              class="text-white input-text bg-[#28223C] mx-2 border-none outline-none"
              placeholder="email.username1@email.com"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-white label">Phone</p>
          <div class="pl-5 mt-2 bg-[#28223C] flex input-div">
            <img src="/smartphone.svg" alt="" />
            <input
              type="tel"
              v-model="user.phone"
              required
              class="text-white input-text bg-[#28223C] mx-2 border-none outline-none"
              placeholder="Username 6-16 karakter standar"
            />
          </div>
        </div>
        <div class="container w-full flex justify-around my-2">
          <button
            @click="backButtonClicked"
            class="bg-[#1A82FD] text-center btn text-white w-64 mr-2 p-2"
          >
            Back
          </button>
          <button
            @click="update"
            class="bg-[#FD1A79] text-center btn text-white w-64 ml-1.5 p-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-div {
  height: 47px;
  /* width: 490px; */
  border-radius: 5px;
}
.heading-text {
  font-family: 'Poppins';
  font-weight: 800;
  font-size: 26px;
  line-height: 39px;
  margin-left: -8px;
}
.label {
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
}
.input-text {
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.btn {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  border-radius: 5px;
}
</style>
