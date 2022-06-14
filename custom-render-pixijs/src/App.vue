<template>
  <circle :x="circleX" y="100"></circle>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { game } from "./game";
export default {
  name: "App",
  components: {},
  setup() {
    const {x: circleX} = useMove()

    return {
      circleX
    }
  }
};

function useMove() {
  const x = ref(100);

  const speed = 5;
  let dir = 1;
  let r = 50;

  const handleTiker = () => {
    x.value += speed * dir;

    if (x.value > 600 - r) {
      dir = -1;
    }

    if (x.value < 0 + r) {
      dir = 1;
    }
  };

  onMounted(() => {
    game.ticker.add(handleTiker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTiker);
  });

  return {
    x,
  };
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
