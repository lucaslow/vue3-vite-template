<template>
  <div class="home">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      test: "1",
    };
  },
  mounted() {},
};
</script>
<script setup>
import { testApi } from "@/api/test";
const name = "Home";
const data = await testApi();
console.log(data);
function log() {
  console.log("记录点击");
}
</script>
