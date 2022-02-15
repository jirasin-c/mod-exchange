<script setup>
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

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
  console.log(amount.value != '')
  if (amount.value != '') {
    tranferAmount.value = (amount.value * baseUSD[`${to}`]) / baseUSD[`${from}`]
    document.getElementById("result").value = tranferAmount.value
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out the information completely.',
    })
  }
}

const switchCurren = (from, to) => {
  let swap = from
  let swap2 = to
  currenFrom.value = swap2
  currenTo.value = swap
  calExchange(swap2, swap)
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
      <div class="grid grid-cols-3 gap-x-5">
        <label class="label">
          <span class="label-text">From</span>
        </label>

        <label class="label col-start-3">
          <span class="label-text">To</span>
        </label>
        <select name id v-model="currenFrom" class="select select-bordered w-full">
          <option v-for="(value, key) in baseUSD">{{ key }}</option>
        </select>
        <button @click="switchCurren(currenFrom, currenTo)" class="btn btn-info">Switch</button>
        <select name id v-model="currenTo" class="select select-bordered w-full">
          <option v-for="(value, key) in baseUSD">{{ key }}</option>
        </select>
        <div class="form-control col-span-3">
          <label class="label place-content-center">
            <span class="label-text">แปลงแล้ว</span>
          </label>
          <label class="input-group input-group-md place-content-center">
            <input
              type="number"
              id="result"
              pointer-events="none"
              class="input input-bordered"
              maxlength="10"
            />
            <span>{{ currenTo }}</span>
            <button @click="calExchange(currenFrom, currenTo)" class="btn btn-info mx-auto">Convert</button>
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex justify-center mt-8">
    <div class="px-10 card bg-base-200 flex">
      <h1 class="flex justify-center mt-3">Exchange Rates</h1>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <p class="px-16 col-start-1">Currency</p>
        <p class="px-16 col-start-2">Amount</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-3 mb-3 text-center" v-for="(value, key) in baseUSD">
        <p>{{ key }}</p>
        <p>{{ value }}</p>
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