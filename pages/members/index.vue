<template>
  <div class="bg-[#1F1B2E] w-screen min-h-screen">
    <NavBar />

    <main class="flex flex-col justify-center items-center px-40 p-10">
      <div class="flex justify-between min-w-full items-center my-5">
        <h1 class="text-[#FD1A79] font text-4xl">Member List</h1>
        <div class="bg-[#393153] flex">
          <img src="/search.svg" class="mx-1" />
          <input
            type="search"
            placeholder="Search..."
            class="placeholder:text-slate-400 p-2 bg-[#393153] w-40 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-white"
          />
        </div>
      </div>
      <table
        class="border-separate border-spacing-y-3 table-auto overflow-hidden mx-auto rounded-lg w-lg md:w-full"
      >
        <thead class="text-white bg-[#482BC7] text-center leading-9">
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Telepon</th>
            <th>Bank</th>
            <th>Nama Rekening</th>
            <th>Nomor Rekening</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-white bg-[#393153] text-center leading-9"
            v-for="(member, index) in members"
            :key="member.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ member.username }}</td>
            <td class="text-[#FDD032] underline">{{ member.email }}</td>
            <td>{{ member.phone }}</td>
            <td>{{ member.name_bank }}</td>
            <td>{{ member.nama_rekening }}</td>
            <td>{{ member.nomor_rekening }}</td>
            <td class="flex items-center justify-end">
              <button
                @click="editButtonClicked(member)"
                class="bg-[#FD1A79] w-20 m-1 rounded-lg text-white"
              >
                Edit
              </button>
              <button
                @click="deleteButtonClicked(member.id)"
                class="bg-[#FD1A79] w-20 m-1 rounded-lg text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center items-center">
        <div
          v-for="(page, index) in pages"
          :key="page.label"
          @click="pageClick(page.url)"
        >
          <img
            v-if="index == 0"
            src="/left.svg"
            class="p-3 mx-1 rounded-full h-10 w-10 border border-solid border-[#8262D4] cursor-pointer"
          />

          <img
            src="/right.svg"
            v-else-if="index == pages.length - 1"
            class="p-3 mx-1 rounded-full h-10 w-10 border border-solid border-[#8262D4] cursor-pointer"
          />

          <button
            v-else
            class="mx-1 rounded-full"
            :class="
              page.active
                ? 'bg-[#5B32FD] p-4 h-14 w-14 font-black text-2xl text-white '
                : 'bg-[#393153] p-1 text-[#8262D4] h-9 w-9 cursor-pointer'
            "
          >
            {{ page.label }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import NavBar from '../../components/NavBar.vue'

const { $axios, store, $toast } = useContext()
const router = useRouter()
const members = ref([])
let pages = ref([])
const baseUrl = 'https://member-api.cktch.top/api/v1/member/accountList'
const fetchMembers = (url) => {
  const token = store.state.token
  $axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      members.value = res.data.data.data
      pages.value = res.data.data.links
      store.commit('setPagination', res.data.data.links)
    })
    .catch((err) => {
      try {
        if (err.response.data.status === 'error') {
          $toast.show(err.response.data.message, {
            theme: 'toasted-primary',
            type: 'error',
            className: 'w-full bg-red-900 rounded-lg font-bold p-3 h-16',

            keepOnHover: true,
            position: 'top-center',
            duration: 4000,
          })
        }
      } catch {
        $toast.show('Some Problem Occurred!', {
          theme: 'toasted-primary',
          type: 'error',
          className: 'w-full bg-red-900 rounded-lg p-3 h-16',

          keepOnHover: true,
          position: 'top-center',
          icon: 'close',
          duration: 4000,
        })
      }
    })
}
onMounted(() => {
  fetchMembers(baseUrl)

  pages.value = store.state.pages
})
const pageClick = (url) => {
  if (url != null) {
    let URL = baseUrl + url
    fetchMembers(URL)
  }
}
const editButtonClicked = (id) => {
  router.push({ path: '/edit-member/', query: { user: id } })
}
const deleteButtonClicked = (userID) => {
  const deleteUrl = 'https://member-api.cktch.top/api/v1/member/deleteAccount'
  const token = store.state.token
  const data = {
    id: userID,
  }
  $axios
    .post(deleteUrl, data, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      fetchMembers(baseUrl)
      $toast.show('Successfully Deleted User', {
        theme: 'toasted-primary',
        type: 'error',
        className: 'w-full bg-green-700 rounded-lg p-3 h-16',

        keepOnHover: true,
        position: 'top-center',
        icon: 'close',
        duration: 4000,
      })
    })
    .catch((err) => {
      try {
        if (err.response.data.status === 'error') {
          $toast.show(err.response.data.message, {
            theme: 'toasted-primary',
            type: 'error',
            className: 'w-full bg-red-900 rounded-lg p-3 h-16',

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
          className: 'w-full bg-blue-700 rounded-lg p-3 h-16',

          keepOnHover: true,
          position: 'top-center',
          icon: 'close',
          duration: 3000,
        })
      }
    })
}
</script>
