<script setup>
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

const baseUSD = reactive({
  USD: 1,
  THB: 32.4575,
  JPY: 115.688,
  CNY: 6.35765,
  KRW: 1197.14,
})

const currenFrom = ref("");
const currenTo = ref("");
const amount = ref("");
const tranferAmount = ref("");
const calExchange = (from, to) => {
  // console.log(`from ${from} : to ${to} : amount ${amount.value}`)
  // console.log(baseUSD[`${to}`])
  console.log(amount.value != '')
  if (amount.value != '') {
    tranferAmount.value = (amount.value * baseUSD[`${to}`]) / baseUSD[`${from}`]
    document.getElementById('result').value = tranferAmount.value
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
  <!-- It's a navigation bar. -->
  <div class="flex">
  <div class="flex relative">
      <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
        <h2 class="text-3xl font-semibold text-center">Mod X-Change</h2>


        <div class="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <a class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md " href="#exchange">
                  <img src="../public/img/coin.png" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  

                  <span class="mx-4 font-medium">Exchanges</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span class="mx-4 font-medium">Card Flip</span>
                </a>
              </li>
            </ul>

          </aside>
          
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
        <select
          name
          id
          v-model="currenFrom"
          class="select select-bordered w-full"
        >
          <option v-for="(value, key) in baseUSD">{{ key }}</option>
        </select>
        <button @click="switchCurren(currenFrom, currenTo)" class="btn btn-info">
          Switch
        </button>
        <select
          name
          id
          v-model="currenTo"
          class="select select-bordered w-full"
        >
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
            <button
              @click="calExchange(currenFrom, currenTo)"
              class="btn btn-info mx-auto"
            >
              Convert
            </button>
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
        v-for="(value, key) in baseUSD"
      >
        <p>{{ key }}</p>
        <p>{{ value }}</p>
      </div>
    </div>
  </div>
</div>
  <!-- <div class="container mx-auto flex justify-center mt-10" id="exchange">
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
        <select
          name
          id
          v-model="currenFrom"
          class="select select-bordered w-full"
        >
          <option v-for="(value, key) in baseUSD">{{ key }}</option>
        </select>
        <button @click="switchCurren(currenFrom, currenTo)" class="btn btn-info">
          Switch
        </button>
        <select
          name
          id
          v-model="currenTo"
          class="select select-bordered w-full"
        >
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
            <button
              @click="calExchange(currenFrom, currenTo)"
              class="btn btn-info mx-auto"
            >
              Convert
            </button>
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
        v-for="(value, key) in baseUSD"
      >
        <p>{{ key }}</p>
        <p>{{ value }}</p>
      </div>
    </div>
  </div> -->


      
</template>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[id='result'] {
  pointer-events: none;
}
</style>
