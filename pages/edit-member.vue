<template>
  <div class="bg-[#1F1B2E] min-h-screen">
    <NavBar />
    <div class="flex justify-center items-center my-10">
      <div class="grid grid-cols-1">
        <h1 class="text-3xl text-[#FD1A79]">Update Member: Username1</h1>
        <div class="flex flex-col">
          <p class="text-white">Username</p>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/add-person.svg" alt="" />
            <input
              aria-disabled="true"
              v-model="user.username"
              type="text"
              class="text-[#FDD032] placeholder:text-[#FDD032] bg-[#28223C] mx-2 border-none outline-none"
              disabled
              placeholder="username1 (readonly)"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-white">Bank</p>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/bank.svg" alt="" />
            <!-- v-model="userDetails.bank_name" -->
            <select
              v-model="user.name_bank"
              class="text-white bg-[#28223C] mx-2 w-full border-none outline-none"
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
          <p class="text-white">Email</p>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/inbox.svg" alt="" />
            <input
              v-model="user.email"
              type="text"
              class="text-white bg-[#28223C] mx-2 border-none outline-none"
              placeholder="email.username1@email.com"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-white">Phone</p>
          <div class="p-5 bg-[#28223C] flex rounded-lg">
            <img src="/smartphone.svg" alt="" />
            <input
              type="tel"
              v-model="user.phone"
              class="text-white bg-[#28223C] mx-2 border-none outline-none"
              placeholder="Username 6-16 karakter standar"
            />
          </div>
        </div>
        <div class="flex justify-around my-2">
          <button
            @click="backButtonClicked"
            class="bg-[#1A82FD] text-center text-white w-64 rounded-lg mx-2 p-2"
          >
            Back
          </button>
          <button
            @click="update"
            class="bg-[#FD1A79] text-center text-white w-64 rounded-lg mx-2 p-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useContext, useRouter, useRoute } from '@nuxtjs/composition-api'
import NavBar from '../components/NavBar.vue'
const { $axios, store } = useContext()

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
      router.push({ path: '/members' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
