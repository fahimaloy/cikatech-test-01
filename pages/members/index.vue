<script setup>
import { onMounted, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import toastr from 'toastr'
import NavBar from '../../components/NavBar.vue'
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

const { $axios, store } = useContext()
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
          toastr.error(err.response.data.message, err.response.data.status)
        }
      } catch {
        toastr.error('Some Error Occurred!', 'Error')
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
      toastr.success('Success', 'Successfully Deleted User!')
      fetchMembers(baseUrl)
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
  <div class="bg-[#1F1B2E] w-screen min-h-screen">
    <NavBar />

    <main
      class="container flex flex-col justify-center items-center mx-auto p-10"
    >
      <div class="flex justify-between min-w-full items-center my-5">
        <h1 class="text-[#FD1A79] font-extrabold pink-text">Member List</h1>
        <div
          class="bg-[#393153] search-box flex focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1"
        >
          <img
            src="/search.svg"
            class="mx-3 my-auto search-icon focus:outline-none"
          />
          <input
            type="search"
            placeholder="Search..."
            class="placeholder:text-[#888398] max-w-fit search-input bg-[#393153] focus:outline-none text-white"
          />
        </div>
      </div>
      <table
        class="table-auto overflow-hidden mx-auto w-fit md:w-full border-separate border-spacing-y-0.5"
      >
        <thead class="thead-class text-white bg-[#482BC7] text-left">
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
            class="tbody-class text-white bg-[#393153] text-left leading-9"
            v-for="(member, index) in members"
            :key="member.id"
          >
            <td>{{ parseInt(index) + 1 }}</td>
            <td>{{ member.username }}</td>
            <td class="text-[#FDD032] underline">{{ member.email }}</td>
            <td>{{ member.phone }}</td>
            <td>{{ member.name_bank }}</td>
            <td>{{ member.nama_rekening }}</td>
            <td>{{ member.nomor_rekening }}</td>
            <td>
              <div class="flex items-center justify-start">
                <button
                  @click="editButtonClicked(member)"
                  class="bg-[#FD1A79] btn-pink m-1 rounded-lg text-white"
                >
                  Edit
                </button>
                <button
                  @click="deleteButtonClicked(member.id)"
                  class="bg-[#FD1A79] btn-pink m-1 rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center items-center mt-14">
        <div
          v-for="(page, index) in pages"
          :key="page.label"
          @click="pageClick(page.url)"
        >
          <img
            v-if="index == 0"
            src="/left.svg"
            class="p-2 mx-1 arrow-pagination rounded-full border border-solid border-[#8262D4] cursor-pointer"
          />

          <img
            src="/right.svg"
            v-else-if="index == pages.length - 1"
            class="p-2 mx-1 arrow-pagination rounded-full border border-solid border-[#8262D4] cursor-pointer"
          />

          <button
            v-else
            class="mx-1 rounded-full"
            :class="
              page.active
                ? 'bg-[#5B32FD] active-pagination-button text-white '
                : 'bg-[#393153] text-[#8262D4] inactive-pagination-button cursor-pointer'
            "
          >
            {{ page.label }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
main {
  max-width: 1110px;
}
.search-box {
  border-radius: 200px;
  width: 195px;
  height: 38px;
  font-size: 14px;
  line-height: 21px;
}

.search-input {
  border-radius: 200px;
  height: 38px;
  width: 145px;
  font-size: 14px;
  line-height: 21px;
}
.search-icon {
  height: 22px;
  width: 22px;
}
.pink-text {
  font-size: 26px;
  line-height: 39px;
}

.btn-pink {
  width: 69px;
  height: 24.8px;
  border-radius: 62px;
  font-size: 12px;
  line-height: 15.42px;
}

td:first-child {
  border-radius: 10px 0 0 10px;
  padding-right: 32px;
  padding-left: 25px;
  color: rgba(255, 255, 255, 0.7);
}
th:first-child {
  border-radius: 10px 0 0 10px;
  padding-right: 32px;
  padding-left: 25px;
}

th:last-child {
  border-radius: 0 10px 10px 0;
  padding-left: 38px;
}
td:last-child {
  border-radius: 0 10px 10px 0;
  padding-left: 32px;
}
.tbody-class {
  height: 40px;
  font-size: 14px;
  line-height: 21px;
}
.thead-class {
  height: 33px;
  font-size: 14px;
  line-height: 21px;
}
thead.thead-class tr th {
  font-weight: 400;
}
tbody::before {
  content: '';
  display: block;
  height: 5px;
}
.inactive-pagination-button {
  height: 29px;
  width: 29px;
  text-align: center;
}
.active-pagination-button {
  height: 47px;
  width: 47px;
  text-align: center;
  font-weight: 700;
}
.arrow-pagination {
  height: 29px;
  width: 29px;
  text-align: center;
}
</style>
