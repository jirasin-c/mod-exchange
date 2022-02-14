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
const filterNotes = computed(() => {
  return arrNotes.value.filter((note) => note.includes(searchNotes.value))
})
const noteSuccess = (i) => {
  console.log(arrNotes[i]);
  if (i > -1) {
    arrNotes.value.splice(i, 1)
  }
  searchNotes.value = ''
  document.querySelector('#search').focus()
}

const baseUSD = {
  USD: 1,
  THB: 32.4575,
  JYP: 115.688,
  CNY: 6.35765,
  KRW: 1197.14
}
const arrCurrency = ref([
  'THB', 'USD', 'JYP', 'CNY', 'KRW'
])

const currenFrom = ref('')
const currenTo = ref('')
const amount = ref()
const tranferAmount = ref()
const calExchange = (from, to) => {
  tranferAmount.value = (amount.value * baseUSD[`${to}`]) / baseUSD[`${from}`]
}

const switchCurren = (from, to) => {
  let swap = from
  let swap2 = to
  currenFrom.value = swap2
  currenTo.value = swap
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

  <!-- <div class="container mx-auto flex justify-center">
    <div v-show="arrNotes.length > 0" class="p-10 card bg-base-200 mb-10">
      <div class>
        Filter note:
        <input type="text" v-model="searchNotes" class="input" id="search" />
      </div>
      <div class>
        <ul>
          <li v-for="(note, index) in arrNotes" :key="index" v-show="search(note)">
            <button
              @click="noteSuccess(index)"
              :key="index"
              class="btn btn-sm btn-success mt-2"
            >Success</button>
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
  </div>-->

  <div class="container mx-auto flex justify-center mt-10" id="exchange">
    <div class="p-10 card bg-base-200 flex justify-center">
      <label class="input-group">
        <span>Amount</span>
        <input
          type="number"
          placeholder="type amount"
          v-model="amount"
          class="input input-bordered"
        />
        <span>{{ currenFrom }}</span>
      </label>
      <div class="container mx-auto flex justify-center flex">
        <div class="form-control mr-10">
          <label class="label">
            <span class="label-text">From</span>
          </label>
          <select name id v-model="currenFrom" class="select select-bordered w-full">
            <option v-for="currency in arrCurrency">{{ currency }}</option>
          </select>
        </div>
        <div>
          <button
            @click="switchCurren(currenFrom, currenTo)"
            class="btn btn-info ml-2 mx-auto"
          >Switch</button>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">To</span>
          </label>
          <select name id v-model="currenTo" class="select select-bordered w-full">
            <option v-for="currency in arrCurrency">{{ currency }}</option>
          </select>
        </div>
      </div>
      <p v-show="tranferAmount > 0">{{ tranferAmount }} {{ currenTo }}</p>
      <button @click="calExchange(currenFrom, currenTo)" class="btn btn-info ml-2 mx-auto">Transfer</button>
    </div>
  </div>

  <!-- <div class="container mx-auto flex justify-center mt-10" id="card-flip">
    <div class="p-10 card bg-base-200">
      <h1>
        CARD FLIP
        <span class="text-red-500">COMING SOON!</span>
      </h1>
    </div>
  </div>-->
</template>
 
<style>
</style>

