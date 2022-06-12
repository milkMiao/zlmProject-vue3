<template>
  <container>
    <sprite :texture="plane"></sprite>
  </container>
</template>

<script>
import plane from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    return {
      plane,
    };
  },
};

export function usePlane() {
  const planeInfo = reactive({
    x: 100,
    y: 300,
  });

  // move

  // eslint-disable-next-line no-unused-vars
  function move() {
    const speed = 10;
    function handleMove(e) {
      switch (e.code) {
        case "ArrowUp":
          planeInfo.y -= speed;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          break;
        case "ArrowRight":
          planeInfo.x += speed;
          break;
      }
    }

    onMounted(() => {
      window.addEventListener("keyup", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleMove);
    });
  }

  move()

  return {
    planeInfo,
  };
}
</script>

<style></style>
