<template>
  <div>{{ count }}</div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(10);
    return {
      count,
    };
  },
};
</script>

<style></style>
