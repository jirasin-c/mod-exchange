<script setup>
import { ref, reactive, computed } from 'vue'
const arrNotes = ref(['Go to school', 'Sleep', 'smile', 'watching YOUTUBE', 'WatCHiNG netfliX'])
const newNotes = ref('')
const searchNotes = ref('')
// const deleteNotes = ref('')
const addNotes = () => {
  if (newNotes.value.length > 0) {
    arrNotes.value.push(newNotes.value)
    newNotes.value = ''
    document.querySelector('#search').focus()
  }
}
const search = (s) => {
  if (s.toLowerCase().match(searchNotes.value.toLowerCase())) {
    return true
  }
  return false
}
const popSuccess = (i) => {
  // console.log(arrNotes.value.length);
  // console.log(arrNotes.value.indexOf(i));
  // arrNotes.value.pop.call(arrNotes.value[i])
  console.log(arrNotes[i]);
  if (i > -1) {
    // arrNotes.value.splice(arrNotes.value[i], 1)
    arrNotes.value.splice(i, 1)
  }

}
</script>
             <!-- :style="arrNotes.value === 0 ? 'display: none' : 'display: block'"     -->
<template>
  <div v-show="arrNotes.length > 0">
    Filter note:
    <input type="text" v-model="searchNotes" />
  </div>
  <div>
    <ul>
      <li v-for="(note, index) in arrNotes" :key="index" v-show="search(note)">
        <button @click="popSuccess(index)" :key="index">{{ index }} Success</button>
        {{ note }}
      </li>
    </ul>
  </div>
  <div>
    New note:
    <input type="text" v-model="newNotes" id="search" @keydown.enter="addNotes" />
    <button @click="addNotes">Add note</button>
  </div>
</template>
 
<style>
</style>
<!-- <script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<!-- <script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
