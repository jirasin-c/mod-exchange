<script setup>
defineEmits(["changeMe"]);
</script>
<template>
  <button @click="$emit('changeMe', ['sus', 'dm,skanfj'])">ssdsada</button>
  <!-- <input
    type="text"
    placeholder="Type here"
    class="input input-bordered input-secondary w-full max-w-xs"
    @change="
      $emit('changeMe', {
        targetValue: $event.target.value,
        targetE: $event.target,
        num: 999,
      })
    "
  /> -->
</template>
<style></style>
