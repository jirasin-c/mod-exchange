<script setup>
import { ref, reactive, computed } from "vue";
import Swal from "sweetalert2";
const baseUSD = reactive([
  {
    name: "USA",
    rate: 1,
    img: "images/USA.png",
  },
  {
    name: "THB",
    rate: 32.4575,
    img: "images/THB.png",
  },
  {
    name: "JPY",
    rate: 115.688,
    img: "images/JPY.png",
  },
  {
    name: "CNY",
    rate: 6.35765,
    img: "images/CNY.png",
  },
  {
    name: "KRW",
    rate: 1197.141,
    img: "images/KRW.png",
  },
]);
const crypto = reactive([
  {
    name: "ETH",
    rate: 0.000379,
    img: "images/ETH.png",
  },
  {
    name: "BTC",
    rate: 0.0000261,
    img: "images/BTC.png",
  },
  {
    name: "DOGE",
    rate: 13.68,
    img: "images/DOGE.png",
  },
  {
    name: "BNB",
    rate: 0.002623,
    img: "images/BNB.png",
  },
]);
const currenFrom = ref("");
const currenTo = ref("");
const amount = ref("");
const tranferAmount = ref("");
const calExchange = (from, to) => {
  // console.log(`from ${from} : to ${to} : amount ${amount.value}`)
  // console.log(baseUSD[`${to}`])
  // console.log(amount.value != "");
  // console.log(baseUSD);
  let countryTo = baseUSD.filter((value) => value.name == [`${to}`])[0];
  let countryFrom = baseUSD.filter((value) => value.name == [`${from}`])[0];
  // console.log(countryTo.rate);
  // console.log(countryFrom.rate);
  // baseUSD.filter(value=> value.name[`${to}`] )
  if (amount.value != "") {
    tranferAmount.value = (amount.value * countryTo.rate) / countryFrom.rate;
    document.getElementById("result").value = tranferAmount.value;
  } else {
    Swal.fire({
      icon: "error",
      title: "ขออภัย...",
      text: "โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย",
    });
  }
};
const calExchangCrypto = (from, to) => {
  let countryTo = crypto.filter((value) => value.name == [`${to}`])[0];
  let countryFrom = crypto.filter((value) => value.name == [`${from}`])[0];
  console.log(to + "  " + from);
  console.log(countryTo + "  " + countryFrom);
  if (amount.value != "") {
    tranferAmount.value = (amount.value * countryTo.rate) / countryFrom.rate;
    // document.getElementById("result").textContent = tranferAmount.value;
  } else {
    Swal.fire({
      icon: "error",
      title: "ขออภัย...",
      text: "โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย",
    });
  }
};
const switchCurren = (from, to) => {
  let swap = from;
  let swap2 = to;
  currenFrom.value = swap2;
  currenTo.value = swap;
  if (amount.value != 0 && isToggle.value == false) calExchange(swap2, swap);
  else if (amount.value != 0 && isToggle.value == true)
    calExchangCrypto(swap2, swap);
  else {
  }
};
const remainingExchange = computed(() =>
  baseUSD.filter((currency) => currency.name != currenFrom.value)
);
const isToggle = ref(false);
const showCrypto = () => {
  isToggle.value = !isToggle.value;
  resetValue();
};
const remainingExchangeCrypto = computed(() =>
  crypto.filter((currency) => currency.name != currenFrom.value)
);

//function push name to input from
const pushToFrom = (nameFrom) => {
  currenFrom.value = nameFrom;
};
//function push name to input from
const pushToTo = (nameTo) => {
  currenTo.value = nameTo;
};
const resetValue = () => {
  currenFrom.value = "";
  currenTo.value = "";
  amount.value = "";
  console.log(tranferAmount.value);
  tranferAmount.value = "";
  document.getElementById("result").value = tranferAmount.value;
};
</script>

<template>
  <div
    class="container mx-auto flex flex-col justify-center"
    id="exchange"
    style="margin-top: -26rem"
  >
    <h1 class="font-title text-center font-extrabold py-6">
      <div class="text-2xl lg:text-5xl text-white">Exchange Money</div>
    </h1>
    <!-- content -->
    <div
      class="px-16 md:px-20 py-10 mt-4 card bg-base-200 flex justify-center item-center shadow-2xl"
    >
      <div class="grid grid-cols-10 grid-rows-3">
        <!-- change function -->
        <div class="col-span-10 flex justify-center">
          <button
            class="btn btn-info btn-sm"
            @click="showCrypto"
            v-if="isToggle"
          >
            Exchang rate
          </button>
          <button class="btn btn-info btn-sm" @click="showCrypto" v-else>
            Cryptocurrency
          </button>
        </div>
        <!-- label1 col 1 -->
        <label class="input-group col-span-3 md:w-11/12">
          <span>Amount</span>
          <input
            type="number"
            placeholder="type amount"
            v-model="amount"
            class="input input-bordered w-3/4"
          />
          <span>{{ currenFrom }}</span>
        </label>
        <!-- label2 col 1 -->
        <label class="input-group col-span-3 md:w-11/12 md:mr-6">
          <span>From</span>
          <select
            name
            id
            v-model="currenFrom"
            class="select select-bordered w-3/4"
          >
            <option v-for="(value, key, index) in baseUSD" v-if="!isToggle">
              {{ value.name }}
            </option>
            <option v-for="(value, key, index) in crypto" v-else>
              {{ value.name }}
            </option>
          </select>
          <span>{{ currenFrom }}</span>
        </label>
        <!-- label3 col 1 -->
        <label class="flex justify-center"
          ><button
            @click="switchCurren(currenFrom, currenTo)"
            class="btn btn-secondary"
          >
            Switch
          </button>
        </label>
        <!-- label4 col 1 -->
        <label class="input-group col-span-3 md:w-11/12">
          <span>To</span>
          <select
            name
            id
            v-model="currenTo"
            class="select select-bordered w-3/4"
          >
            <option
              v-for="(value, key, index) in remainingExchange"
              v-if="!isToggle"
            >
              {{ value.name }}
            </option>
            <option
              v-for="(value, key, index) in remainingExchangeCrypto"
              v-else
            >
              {{ value.name }}
            </option>
          </select>
          <span>{{ currenTo }}</span>
        </label>
        <label class="label place-content-center col-span-10">
          <span class="label-text text-xl">Result</span>
        </label>
        <div class="col-span-10">
          <label class="input-group input-group-md place-content-center">
            <input
              type="number"
              id="result"
              pointer-events="none"
              class="input input-bordered w-1/3"
              maxlength="10"
              v-model="tranferAmount"
            />
            <span>{{ currenTo }}</span>
            <button
              @click="calExchange(currenFrom, currenTo)"
              class="btn btn-primary"
              v-if="!isToggle"
            >
              Convert
            </button>
            <button
              @click="calExchangCrypto(currenFrom, currenTo)"
              class="btn btn-primary"
              v-else
            >
              Convert
            </button>
            <button class="btn btn-warning" @click="resetValue">Reset</button>
          </label>
        </div>
      </div>
    </div>
  </div>

  <!-- exchange rate section -->
  <div class="container mx-auto flex justify-center mt-8">
    <div class="px-16 py-2 card bg-base-200 flex shadow-2xl">
      <h1 class="font-title text-center font-extrabold mt-2">
        <div class="text-2xl lg:text-2xl">Rate Money</div>
      </h1>
      <div class="grid grid-cols-3 gap-4 mt-3">
        <p class="px-32">Currency</p>
        <p class="px-32">Amount</p>
        <p class="px-32">Country</p>
      </div>
      <div
        class="grid justify-items-center grid-cols-3 gap-4 mt-3 mb-3 text-center"
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
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 5,
            }).format(value.rate)
          }}
        </p>
        <div class="btn-group">
          <button
            class="btn btn-sm btn-outline btn-info"
            @click="pushToFrom(value.name)"
          >
            From
          </button>
          <button
            class="btn btn-sm btn-outline btn-info"
            @click="pushToTo(value.name)"
          >
            To
          </button>
        </div>
      </div>

      <div
        class="grid justify-items-center grid-cols-3 gap-4 mt-3 mb-3 text-center"
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
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 5,
            }).format(value.rate)
          }}
        </p>
        <div>
          <div class="btn-group">
            <button
              class="btn btn-sm btn-outline btn-info"
              @click="pushToFrom(value.name)"
            >
              From
            </button>
            <button
              class="btn btn-sm btn-outline btn-info"
              @click="pushToTo(value.name)"
            >
              To
            </button>
          </div>
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
