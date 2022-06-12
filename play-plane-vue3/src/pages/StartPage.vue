<template>
  <container>
    <sprite :texture="startPage"></sprite>
    <sprite :texture="startBtn" x="250" y="520" @click="startGame" :interactive="true"></sprite>
  </container>
</template>

<script>
import startPage from "../assets/start_page.jpg";
import startBtn from "../assets/startBtn.png";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      emit("change-page", "GamePage");
    };

    return {
      startGame,
      startPage,
      startBtn,
    };
  },
};
</script>

<style></style>
