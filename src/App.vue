<script setup>
import { ref, reactive, computed } from 'vue'

const baseUSD = reactive({
  USD: 1,
  THB: 32.4575,
  JYP: 115.688,
  CNY: 6.35765,
  KRW: 1197.14
})

const currenFrom = ref('')
const currenTo = ref('')
const amount = ref('')
const tranferAmount = ref('')
const calExchange = (from, to) => {
  // console.log(`from ${from} : to ${to} : amount ${amount.value}`)
  // console.log(baseUSD[`${to}`])
  tranferAmount.value = (amount.value * baseUSD[`${to}`]) / baseUSD[`${from}`]
  document.getElementById("result").value = tranferAmount.value
}

const switchCurren = (from, to) => {
  let swap = from
  let swap2 = to
  currenFrom.value = swap2
  currenTo.value = swap
}
</script>

<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold">Mod X Change</span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <a class="btn btn-ghost btn-sm rounded-btn" href="#exchange">Exchange</a>
        <a class="btn btn-ghost btn-sm rounded-btn" href="#card-flip">Card Flip</a>
      </div>
    </div>
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
  </div>

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

      <div class="container mx-auto justify-center flex">
        <div class="form-control mr-10">
          <label class="label">
            <span class="label-text">From</span>
          </label>
          <select name id v-model="currenFrom" class="select select-bordered w-full">
            <option v-for="currency in arrCurrency">{{ currency }}</option>
          </select>
        </div>

        <div class="form-control mr-10 mt-10">
          <button
            @click="switchCurren(currenFrom, currenTo)"
            class="btn btn-secondary ml-2 mx-auto"
          >Switch</button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">To</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[id="result"] {
  pointer-events: none;
}
</style>