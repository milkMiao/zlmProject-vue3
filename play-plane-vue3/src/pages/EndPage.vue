<template>
  <container>
    <sprite :texture="endPage"></sprite>
    <sprite :texture="restartBtn" x="250" y="520" @click="startGame" :interactive="true"></sprite>
  </container>
</template>

<script>
import endPage from "../assets/end_page.jpg";
import restartBtn from "../assets/restartBtn.png";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      emit("change-page", "GamePage");
    };

    return {
      startGame,
      endPage,
      restartBtn,
    };
  },
};
</script>

<style></style>
