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

//onAttack 处理一下这个回调函数
export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 100,
    y: 300,
    width: 258,
    height: 364
  });

  //攻击--我方飞机-按下空格键，发射子弹
  function attack(){
    function handelAttack(e){
      if(e.code === 'Space'){
        console.log('attack 空格触发子弹创建')

        onAttack && onAttack({
          x: planeInfo.x + 100,
          y: planeInfo.y
        })
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handelAttack);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handelAttack);
    });
  }

  // eslint-disable-next-line no-unused-vars
  //我方飞机-上下左右移动操作
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
  attack()

  return {
    planeInfo,
  };
}
</script>

<style></style>
