<template>
  <div @click="log">{{ state }}</div>
</template>
<script>
import { useStore } from "vuex"
export default {
  name: "Home",
  data() {
    return {
      test: "1",
    };
  },
};
</script>
<script setup>
const name = "Home";

function log() {
  console.log("记录点击");
}
</script>
