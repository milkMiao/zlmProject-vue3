<template>
  <container>
    <!-- 地图 -->
    <Map></Map>

    <!-- 我方飞机--按下空格键，发射子弹【创建子弹操作】 -->
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane> 

    <!-- 敌方飞机 -->
    <Enemy v-for="(enemy ,index) in enemys" :key="index" :x=enemy.x :y=enemy.y></Enemy>

    <!-- 子弹 -->
    <Bullet v-for="(bullet ,index) in bullets" :key="index" :x=bullet.x :y=bullet.y></Bullet>

  </container>
</template>

<script>
// import { onMounted ,onUnmounted } from 'vue'
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import Enemy, { useEnemy } from '../components/Enemy.vue'
import Bullet, { useBullet } from '../components/Bullet.vue'
// import { game } from '../game'
// import { hitTestObject } from '../utils' //飞机是否碰撞判断
import { useFighting } from '../fighting'
export default {
  components: {
    Map,
    Plane,
    Enemy,
    Bullet
  },

  setup(props, { emit }) {
    const { enemys, hitEnemy } = useEnemy();
    const { bullets, addBullet } = useBullet(); //数据是--Bullet组件暴露出来的，可以直接使用
    // const { planeInfo } = usePlane() //旧版
    const { planeInfo } = usePlane({ //新版--增加回调函数onAttack，触发addBullet---子弹添加操作
      onAttack(position){
        addBullet(position)
        console.log('position----',position)
      }
    });

    //游戏结束封装-增加代码可读性
    const gameover = () => {
      emit("change-page", "EndPage");
    };
    // 飞机碰撞检测
    useFighting({ planeInfo,enemys, bullets,gameover,hitEnemy})
   
    return {
      planeInfo,
      enemys,
      bullets
    };
  },
};
</script>

<style></style>
