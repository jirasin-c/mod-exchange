<script setup>
import { ref, reactive, computed } from 'vue'
const arrNotes = ref([])
const newNotes = ref('')
const searchNotes = ref('')
const addNotes = () => {
  if (newNotes.value.length > 0) {
    arrNotes.value.push(newNotes.value)
    newNotes.value = ''
    document.querySelector('#add').focus()
  }
}
const search = (s) => {
  if (s.toLowerCase().match(searchNotes.value.toLowerCase())) {
    return true
  }
  return false
}
const noteSuccess = (i) => {
  console.log(arrNotes[i]);
  if (i > -1) {
    arrNotes.value.splice(i, 1)
  }
  searchNotes.value = ''
  document.querySelector('#search').focus()
}
</script>
             <!-- :style="arrNotes.value === 0 ? 'display: none' : 'display: block'"     -->
<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold">ModX Change</span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <a class="btn btn-ghost btn-sm rounded-btn" href="#exchange">Exchange</a>
        <a class="btn btn-ghost btn-sm rounded-btn" href="#card-flip">Card Flip</a>
      </div>
    </div>
    <!-- <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>-->
  </div>

  <div class="container mx-auto flex justify-center">
    <div v-show="arrNotes.length > 0" class="p-10 card bg-base-200 mb-10">
      <div class>
        Filter note:
        <input type="text" v-model="searchNotes" class="input" id="search" />
      </div>
      <div class>
        <ul>
          <li v-for="(note, index) in arrNotes" :key="index" v-show="search(note)">
            <button @click="noteSuccess(index)" :key="index" class="btn btn-success mt-2">Success</button>
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex justify-center">
    <div class="p-10 card bg-base-200">
      <div class>
        New note:
        <input
          type="text"
          v-model="newNotes"
          id="add"
          @keydown.enter="addNotes"
          class="input"
        />
        <button @click="addNotes" class="btn btn-primary ml-2">Add note</button>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex justify-center mt-10" id="exchange">
    <div class="p-10 card bg-base-200">
      <div class>
        Amount:
        <input
          type="text"
          v-model="newNotes"
          id="add"
          @keydown.enter="addNotes"
          class="input"
        />
        <button @click="addNotes" class="btn btn-info ml-2">Transfer</button>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex justify-center mt-10" id="card-flip">
    <div class="p-10 card bg-base-200">
      <h1>
        CARD FLIP
        <span class="text-red-500">COMING SOON!</span>
      </h1>
    </div>
  </div>
</template>
 
<style>
</style>

