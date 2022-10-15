<template>
  <div>
    <NavBar />
    <div class="w-4/5 mx-auto transform translate-x-0 md:translate-x-14 my-10">
      <table
        class="table-auto overflow-hidden mx-auto w-lg md:w-full border-separate border-spacing-y-0.5"
      >
        <thead class="thead-class text-white bg-[#482BC7] text-left leading-9">
          <tr class="">
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
        <tbody class="">
          <tr class="tbody-class text-white bg-[#393153] text-left leading-9">
            <td>1</td>
            <td>fahimaloy</td>
            <td class="text-[#FDD032] underline">Fahim Ahmed</td>
            <td>01401440789</td>
            <td>BCI</td>
            <td>Fahim Ahmed</td>
            <td>11038900</td>
            <td>
              <div class="flex items-center justify-center">
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
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>
