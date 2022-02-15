<script setup>
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

const baseUSD = reactive([{
  name: 'USA',
  rate: 1,
  img: "../public/images/USA.png"
},
{
  name: 'THA',
  rate: 32.4575,
  img: "../public/images/THA.png"
}
  ,
{
  name: 'JPY',
  rate: 115.688,
  img: "../public/images/JPY.png"
},
{
  name: 'CNY',
  rate: 6.35765,
  img: "../public/images/CNY.png"
},
{
  name: 'KRW',
  rate: 1197.141,
  img: "../public/images/KRW.png"
}
])
const currenFrom = ref('')
const currenTo = ref('')
const amount = ref('')
const tranferAmount = ref('')
const calExchange = (from, to) => {
  // console.log(`from ${from} : to ${to} : amount ${amount.value}`)
  // console.log(baseUSD[`${to}`])
  console.log(amount.value != '')
  console.log(baseUSD);
  let countryTo = baseUSD.filter(value => value.name == [`${to}`])[0]
  let countryFrom = baseUSD.filter(value => value.name == [`${from}`])[0]
  console.log(countryTo.rate);
  console.log(countryFrom.rate);
  // baseUSD.filter(value=> value.name[`${to}`] )
  if (amount.value != '') {
    tranferAmount.value = (amount.value * countryTo.rate) / countryFrom.rate
    document.getElementById("result").value = tranferAmount.value
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ขออภัย...',
      text: 'โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย',
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
          <option v-for="(value, key, index) in baseUSD">{{ value.name }}</option>
        </select>
        <button @click="switchCurren(currenFrom, currenTo)" class="btn btn-secondary">Switch</button>
        <select name id v-model="currenTo" class="select select-bordered w-full">
          <option v-for="(value, key, index) in baseUSD">{{ value.name }}</option>
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
            <button
              @click="calExchange(currenFrom, currenTo)"
              class="btn btn-primary mx-auto"
            >Convert</button>
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
      <div
        class="grid grid-cols-2 gap-4 mt-3 mb-3 text-center"
        v-for="(value, key, index) in baseUSD"
      >
        <p>
          <span class="avatar">
            <span class="w-8 rounded flex items-center mr-10">
              <img :src="`${value.img}`" class="mr-2" />
              <p>{{ value.name }}</p>
            </span>
          </span>
        </p>
        <p>{{ value.rate }}</p>
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