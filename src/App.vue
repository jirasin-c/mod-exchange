<script setup>
import { ref, reactive, computed } from "vue";
import Swal from "sweetalert2";

//data currency
const baseUSD = reactive([
  {
    name: "USD",
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

//ref var for v-model
const currenFrom = ref("");
const currenTo = ref("");
const amount = ref("");
const tranferAmount = ref("");
const isCrypto = ref(false);
const searchWord = ref("");
const isToggle = ref(false);

//function calculate exchange rate
const calExchange = (from, to) => {
  console.log(amount.value != "");
  let countryTo = baseUSD.filter((value) => value.name == [`${to}`])[0];
  let countryFrom = baseUSD.filter((value) => value.name == [`${from}`])[0];
  if (amount.value != 0) {
    tranferAmount.value = (amount.value * countryTo.rate) / countryFrom.rate;
  } else {
    Swal.fire({
      icon: "error",
      title: "ขออภัย...",
      text: "โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย",
    });
  }
};

//function calculate crypto rate
const calCrypto = (from, to) => {
  console.log(amount.value != "");
  let cryptoTo = crypto.filter((value) => value.name == [`${to}`])[0];
  let cryptoFrom = crypto.filter((value) => value.name == [`${from}`])[0];
  if (amount.value != 0) {
    tranferAmount.value = (amount.value * cryptoTo.rate) / cryptoFrom.rate;
  } else {
    Swal.fire({
      icon: "error",
      title: "ขออภัย...",
      text: "โปรดกรอกข้อมูลในช่องว่างให้เรียบร้อย",
    });
  }
};

//fucntion switch currency
const switchCurren = (from, to) => {
  let swap = from;
  let swap2 = to;
  currenFrom.value = swap2;
  currenTo.value = swap;
  if (amount.value != 0 && isCrypto.value == false) {
    calExchange(swap2, swap);
  } else if (amount.value != 0 && isCrypto.value == true) {
    calCrypto(swap2, swap);
  }
};

//computed remaining exchange currency
const remainingExchange = computed(() =>
  baseUSD.filter((currency) => currency.name != currenFrom.value)
);

//computed remaining crypto currency
const remainingExchangeCrypto = computed(() =>
  crypto.filter((currency) => currency.name != currenFrom.value)
);

//swap between exchange and crypto
const showCrypto = () => {
  isCrypto.value = !isCrypto.value;
  searchWord.value = "";
  resetValue();
};

//function push name of currency to calculate
const pushToFrom = (nameFrom) => {
  currenFrom.value = nameFrom;
  searchWord.value = "";
};
//function push name of currency to calculate
const pushToTo = (nameTo) => {
  currenTo.value = nameTo;
  searchWord.value = "";
};

//reset the value on calculate section
const resetValue = () => {
  currenFrom.value = "";
  currenTo.value = "";
  amount.value = "";
  console.log(tranferAmount.value);
  tranferAmount.value = "";
};

//function search the currency name each country
const filterSearch = computed(() => {
  if (isCrypto.value != true) {
    return baseUSD.filter((currWord) =>
      currWord.name
        .toLocaleLowerCase()
        .includes(searchWord.value.toLocaleLowerCase())
    );
  } else {
    return crypto.filter((currWord) =>
      currWord.name
        .toLocaleLowerCase()
        .includes(searchWord.value.toLocaleLowerCase())
    );
  }
});

//toggle dark or light mode
const displaymode = () => {
  isToggle.value = !isToggle.value;
  if (isToggle.value) {
    document.getElementsByTagName("html")[0].setAttribute("data-theme", "dark");
  } else {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", "light");
  }
};

//date and time function
const currentDate = ref(new Date());
const currentTime = ref(new Date());
const currentWeekDay = computed(() => {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDay[currentTime.value.getDay()];
});

const clock = reactive({
  date: currentDate,
  time: currentTime,
});
setInterval(() => {
  clock.date = new Date();
  clock.time = new Date();
}, 1000);
const time = computed(() => {
  const hours = clock.time.getHours();
  const minutes = clock.time.getMinutes();
  const seconds = clock.time.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
});
const currentDateString = computed(() => {
  return clock.date.toLocaleDateString();
});
</script>

<template>
  <!-- Nav bar section -->
  <nav
    class="
      navbar
      bg-gradient-to-r
      from-cyan-500
      to-blue-500
      mb-40
      shadow-xl
      rounded-b-lg
      pb-64
    "
  >
    <div class="navbar-start">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <input
        type="text"
        placeholder="Type here . . ."
        class="input w-full max-w-xs input-sm text-black"
      />
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl">ModX-Change</a>
    </div>
    <div class="navbar-end">
      <div class="grid grid-cols-3 gap-2 text-center text-l font-bold mr-3">
        <p>{{ currentWeekDay }}</p>
        <p>{{ currentDateString }}</p>
        <p>{{ time }}</p>
      </div>
      <div class="mx-2">
        <!-- moon icon -->
        <svg
          class="swap-off fill-current w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </div>

      <input
        type="checkbox"
        class="toggle mt-1 toggle-md toggle-primary"
        @click="displaymode()"
        checked
      />
      <div class="mx-2">
        <!-- sun icon -->
        <svg
          class="swap-on fill-current w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>
      </div>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </nav>
  <!-- Calculate exchange section -->
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
      class="
        px-16
        md:px-20
        py-10
        mt-4
        card
        bg-base-200
        flex
        justify-center
        item-center
        shadow-2xl
      "
    >
      <div class="grid grid-cols-10 grid-rows-3">
        <!-- change function -->
        <div class="col-span-10 flex justify-center">
          <button
            class="btn btn-info btn-sm"
            @click="showCrypto"
            v-if="isCrypto"
          >
            $ Exchang rate
          </button>
          <button class="btn btn-info btn-sm" @click="showCrypto" v-else>
            $ Cryptocurrency
          </button>
        </div>
        <!-- label1 col 1 (Amount section)-->
        <label class="input-group col-span-3 md:w-11/12">
          <span>Amount</span>
          <input
            type="number"
            placeholder="type amount"
            v-model="amount"
            class="input input-bordered w-3/4 text-center text-xl"
          />
          <span>{{ currenFrom }}</span>
        </label>
        <!-- label2 col 1 (CurrencyFrom section)-->
        <label class="input-group col-span-3 md:w-11/12 md:mr-6">
          <span>From</span>
          <select
            name
            id
            v-model="currenFrom"
            class="select select-bordered w-3/4 text-xl"
          >
            <option v-for="(value, key, index) in baseUSD" v-if="!isCrypto">
              {{ value.name }}
            </option>
            <option v-for="(value, key, index) in crypto" v-else>
              {{ value.name }}
            </option>
          </select>
          <span>{{ currenFrom }}</span>
        </label>
        <!-- label3 col 1 (Swap button section) -->
        <label class="flex justify-center">
          <button
            @click="switchCurren(currenFrom, currenTo)"
            class="btn btn-secondary"
          >
            Switch
          </button>
        </label>
        <!-- label4 col 1 (CurrencyTo  section)-->
        <label class="input-group col-span-3 md:w-11/12">
          <span>To</span>
          <select
            name
            id
            v-model="currenTo"
            class="select select-bordered w-3/4 text-xl"
          >
            <option
              v-for="(value, key, index) in remainingExchange"
              v-if="!isCrypto"
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
        <!-- label4 col 2 (Result  Section) -->
        <label class="label place-content-center col-span-10">
          <span class="label-text text-xl">Result</span>
        </label>
        <div class="col-span-10">
          <label class="input-group input-group-md place-content-center">
            <input
              type="number"
              id="result"
              pointer-events="none"
              class="input input-bordered w-1/3 text-center text-xl"
              maxlength="10"
              v-model="tranferAmount"
            />
            <span>{{ currenTo }}</span>
            <button
              @click="calExchange(currenFrom, currenTo)"
              class="btn btn-primary"
              v-if="!isCrypto"
            >
              Convert
            </button>
            <button
              @click="calCrypto(currenFrom, currenTo)"
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

  <!-- Exchange rate section -->
  <div class="container mx-auto flex justify-center mt-8">
    <div class="px-16 py-2 card bg-base-200 flex shadow-2xl">
      <h1 class="font-title text-center font-extrabold mt-2">
        <div class="text-2xl lg:text-2xl">Rate Money</div>
      </h1>
      <!-- Search section -->
      <div class="md:flex md:justify-end mb-1 mt-1">
        <input
          type="text"
          placeholder="Search currency . . ."
          class="input input w-64 max-w-xs input-sm"
          v-model="searchWord"
        />
      </div>

      <!-- Table Head -->
      <div class="grid grid-cols-3 gap-4 mt-3">
        <p class="px-32 font-semibold">Currency</p>
        <p class="px-32 font-semibold">Amount</p>
        <p class="px-32 font-semibold">Country</p>
      </div>
      <!-- Table Body -->
      <div
        class="
          grid
          justify-items-center
          grid-cols-3
          gap-4
          mt-3
          mb-3
          text-center
        "
        v-for="(value, key, index) in filterSearch"
        v-if="!isCrypto"
      >
        <p>
          <span class="avatar">
            <span class="w-8 rounded flex items-center mr-10">
              <img :src="`${value.img}`" class="mr-2" />
              <p class="text-xl">{{ value.name }}</p>
            </span>
          </span>
        </p>
        <p class="text-xl">
          {{
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: `${value.name}`,
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
      <!-- Table Body -->
      <div
        class="
          grid
          justify-items-center
          grid-cols-3
          gap-4
          mt-3
          mb-3
          text-center
        "
        v-for="(value, key, index) in filterSearch"
        v-else
      >
        <p>
          <span class="avatar">
            <span class="w-8 rounded flex items-center mr-10">
              <img :src="`${value.img}`" class="mr-2" />
              <p class="text-xl">{{ value.name }}</p>
            </span>
          </span>
        </p>
        <p class="text-xl">
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
