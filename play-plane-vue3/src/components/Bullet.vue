<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import bulletImg from "../assets/bullet.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
// import config from '../config'
export default {
  setup() {
    return {
      bulletImg,
    };
  },
};

export function useBullet() {
    const bullets = reactive([ ]);
    // [{x: 50, y: 50,},
    //  { x: 100,y: 100,}]
    //添加子弹
    function addBullet(position){
        bullets.push({ width:61, height:99, ...position})
    }

    // eslint-disable-next-line no-unused-vars
    //子弹移动操作
    function move() {
        const speed = 10//config.plane.bullet;
        function handleTicker() {
            bullets.forEach((bullet, index)=>{
                bullet.y -= speed;

                if(bullet.y < -100){ //子弹屏幕消失--删除处理
                    bullets.splice(index,1)
                }
            })
           
        }
        onMounted(() => {
            game.ticker.add(handleTicker);
        });
        onUnmounted(() => {
            game.ticker.remove(handleTicker);
        });
    }
    move();

    return {
        bullets,
        addBullet
    };
}
</script>

<style></style>
