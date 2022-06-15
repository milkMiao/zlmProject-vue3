<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import enemyImg from "../assets/enemy.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
import config from '../config'
export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export function useEnemy() {
    const enemys = reactive([]);

    // 1秒创建一个敌机
    // 抽离飞机速度配置 config
    // 超出底部屏幕，移除敌机
    function createEnemy(){
        setInterval(()=>{
            enemys.push({
                x: Math.floor(Math.random() * 500)+50 ,
                y: -100,
                speed: typeof(config.enemy.speed) ==="function" ? config.enemy.speed() : config.enemy.speed, //Math.floor(Math.random() * 10)+5
                width: 308,
                height: 207,
                HP: 2
            });
        }, 1000)
    }

  //触发两次--才会销毁
  function hitEnemy(enemy,enemyIndex){
    enemy.HP--;
    if(enemy.HP <= 0){
      //销毁操作
      enemys.splice(enemyIndex, 1);
    }
  }

  // move
  // eslint-disable-next-line no-unused-vars
    function move() {
        function handleTicker() { //敌机操作
            enemys.forEach((enemy,index) =>{
                enemy.y += enemy.speed;
                //移除飞机---超出底部屏幕，删除敌机
                if(enemy.y > 1300){
                    enemys.splice(index,1)
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

    createEnemy();
    move();

    return {
        enemys,
        hitEnemy,
    };
}
</script>

<style></style>
