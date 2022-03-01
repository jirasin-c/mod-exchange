<script setup>
import { ref, reactive, computed } from "vue";
import Swal from "sweetalert2";

import Navbar from "./components/Navbar.vue";
import Exchange from "./components/Exchange.vue";
import EventProp from "./components/EventProp.vue";

const printMessage = (e) => {
  // console.log(e.targetValue);
  // console.log(e.targetE);
  // console.log(e.num);
  console.log("update me 7" + e[0] + e[1]);
  // console.log(n);
  // console.log(status);
};
</script>

<template>
  <Navbar greetting-message="hfdo" />
  <Exchange />
  <EventProp @changeMe="printMessage($event)" />
</template>

<style></style>
