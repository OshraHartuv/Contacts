<template>
  <input type="text" v-model="filterBy" @input="setFilter" />
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["setFilter"],
  setup(props, ctx) {
    const filterBy = ref("");

    function setFilter() {
      ctx.emit("setFilter", filterBy.value);
    }

    return { filterBy, setFilter };
  }
};
</script>

<style>
</style>