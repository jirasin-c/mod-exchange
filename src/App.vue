<script setup>
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

//date and time
const currentDate = ref(new Date())
const currentTime = ref(new Date())

const clock = reactive({
  date: currentDate,
  time: currentTime,
})

setInterval(() => {
  clock.date = new Date()
  clock.time = new Date()
}, 1000)

const time = computed(() => {
  const hours = clock.time.getHours()
  const minutes = clock.time.getMinutes()
  const seconds = clock.time.getSeconds()

  return `${hours}:${minutes}:${seconds}`
})

const currentDateString = computed(() => {
  return clock.date.toLocaleDateString()
})

//data currency
const baseUSD = reactive([
  {
    name: 'USD',
    rate: 1,
    img: 'images/USA.png',
  },
  {
    name: 'THB',
    rate: 32.4575,
    img: 'images/THA.png',
  },
  {
    name: 'JPY',
    rate: 115.688,
    img: 'images/JPY.png',
  },
  {
    name: 'CNY',
    rate: 6.35765,
    img: 'images/CNY.png',
  },
  {
    name: 'KRW',
    rate: 1197.141,
    img: 'images/KRW.png',
  },
])
const crypto = reactive([
  {
    name: 'ETH',
    rate: 0.000379,
    img: 'images/ETH.png',
  },
  {
    name: 'BTC',
    rate: 0.0000261,
    img: 'images/BTC.png',
  },
  {
    name: 'DOGE',
    rate: 13.68,
    img: 'images/DOGE.png',
  },
  {
    name: 'BNB',
    rate: 0.002623,
    img: 'images/BNB.png',
  },
])

//ref var for v-model
const currenFrom = ref('')
const currenTo = ref('')
const amount = ref('')
const tranferAmount = ref('')
const isToggle = ref(false)

//function calculate exchange rate
const calExchange = (from, to) => {
  console.log(amount.value != '')
  let countryTo = baseUSD.filter((value) => value.name == [`${to}`])[0]
  let countryFrom = baseUSD.filter((value) => value.name == [`${from}`])[0]
  if (amount.value != '') {
    tranferAmount.value = (amount.value * countryTo.rate) / countryFrom.rate
    document.getElementById('result').value = tranferAmount.value
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ขออภัย...',
      text: 'โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย',
    })
  }
}

//function calculate crypto rate
const calCrypto = (from, to) => {
  console.log(amount.value != '')
  let cryptoTo = crypto.filter((value) => value.name == [`${to}`])[0]
  let cryptoFrom = crypto.filter((value) => value.name == [`${from}`])[0]
  if (amount.value != '') {
    tranferAmount.value = (amount.value * cryptoTo.rate) / cryptoFrom.rate
    document.getElementById('result').value = tranferAmount.value
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ขออภัย...',
      text: 'โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย',
    })
  }
}

//fucntion switch currency
const switchCurren = (from, to) => {
  let swap = from
  let swap2 = to
  if (amount.value != '') {
    currenFrom.value = swap2
    currenTo.value = swap
    calExchange(swap2, swap)
  }
  currenFrom.value = swap2
  currenTo.value = swap
}

//computed remaining exchange currency
const remainingExchange = computed(() =>
  baseUSD.filter((currency) => currency.name != currenFrom.value)
)

//computed remaining crypto currency
const remainingCrypto = computed(() =>
  crypto.filter((currency) => currency.name != currenFrom.value)
)

//function show crypto or exchange
const showCrypto = () => {
  console.log(isToggle.value)
  isToggle.value = !isToggle.value
  if (isToggle.value == true) {
    document.getElementById('crypto').textContent = 'exchange'
  } else {
    document.getElementById('crypto').textContent = 'cryptocurrency'
  }
  console.log(isToggle.value)
}
</script>

<template>
  <div style="text-align: center; margin-top: 2rem">
    <button class="btn btn-info" @click="showCrypto" id="crypto">
      cryptocurrency
    </button>
  </div>

  <div class="container mx-auto flex justify-center mt-10" id="exchange">
    <div class="p-10 card bg-base-200 flex justify-center" v-if="!isToggle">
      <h1 class="flex justify-center mb-5 text-xl font-bold">Exchange</h1>

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
          <option v-for="(value, key, index) in baseUSD">
            {{ value.name }}
          </option>
        </select>
        <button
          @click="switchCurren(currenFrom, currenTo)"
          class="btn btn-secondary"
        >
          Switch
        </button>
        <select
          name
          id
          v-model="currenTo"
          class="select select-bordered w-full"
        >
          <option v-for="(value, key, index) in remainingExchange">
            {{ value.name }}
          </option>
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
            >
              Convert
            </button>
          </label>
        </div>
      </div>
    </div>
    <div class="p-10 card bg-base-200 flex justify-center" v-else>
      <h1 class="flex justify-center mb-5 text-xl font-bold">Crypto</h1>
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
          <option v-for="(value, key, index) in crypto">
            {{ value.name }}
          </option>
        </select>
        <button
          @click="switchCurren(currenFrom, currenTo)"
          class="btn btn-secondary"
        >
          Switch
        </button>
        <select
          name
          id
          v-model="currenTo"
          class="select select-bordered w-full"
        >
          <option v-for="(value, key, index) in remainingCrypto">
            {{ value.name }}
          </option>
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
              @click="calCrypto(currenFrom, currenTo)"
              class="btn btn-primary mx-auto"
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
      <h1 class="flex justify-center mt-3 text-lg font-bold text-violet-500">
        Exchange Rates
      </h1>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <p class="px-16 col-start-1 font-bold">Currency</p>
        <p class="px-16 col-start-2 font-bold">Amount</p>
      </div>
      <div
        class="grid grid-cols-2 gap-4 mt-3 mb-3 text-center"
        v-for="(value, key, index) in baseUSD"
        v-if="!isToggle"
      >
        <p>
          <span class="avatar">
            <span class="w-8 rounded flex items-center mr-10">
              <img :src="`${value.img}`" class="mr-2" />
              <p>{{ value.name }}</p>
            </span>
          </span>
        </p>
        <p>
          {{
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: `${value.name}`,
              minimumFractionDigits: 5,
            }).format(value.rate)
          }}
        </p>
      </div>

      <div
        class="grid grid-cols-2 gap-4 mt-3 mb-3 text-center"
        v-for="(value, key, index) in crypto"
        v-else
      >
        <p>
          <span class="avatar">
            <span class="w-8 rounded flex items-center mr-10">
              <img :src="`${value.img}`" class="mr-2" />
              <p>{{ value.name }}</p>
            </span>
          </span>
        </p>
        <p>
          {{
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 5,
            }).format(value.rate)
          }}
        </p>
      </div>
    </div>
  </div>

  <!-- display current date and time -->
  <div class="container mx-auto flex justify-center mt-8">
    <div class="px-10 card bg-base-200 flex">
      <h1 class="flex justify-center mt-3 text-lg font-bold text-violet-500">
        Current Date and Time
      </h1>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <p class="px-16 col-start-1 font-bold">Date</p>
        <p class="px-16 col-start-2 font-bold">Time</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-3 mb-3 text-center">
        <p>{{ currentDateString }}</p>
        <p>{{ time }}</p>
      </div>
    </div>
  </div>
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
