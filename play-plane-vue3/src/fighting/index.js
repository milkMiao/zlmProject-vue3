import { game } from '../game'
import { hitTestObject } from '../utils' //飞机是否碰撞判断
import { onMounted, onUnmounted } from 'vue'

//代码重构很重要！！！
//1、我方飞机与敌方飞机碰撞处理--游戏结束
//2、我方飞机与敌方飞机碰撞处理--我方子弹&敌方飞机消失
export function useFighting ({planeInfo,enemys, bullets,gameover,hitEnemy}){
    // 飞机碰撞检测
    function handelTicker(){
        //时刻检测飞机碰撞监测 ---objeA,objB两个飞机----hitTestObject
        //1、我方飞机与敌方飞机碰撞--游戏结束-跳转页面
        enemys.forEach( enemy =>{
            if(hitTestObject(planeInfo, enemy)){ //两飞机碰撞到一起，游戏结束 gameOver
              //game over跳转页面
            //   emit('change-page','EndPage') 旧版
                gameover()   //新版
            }
        })
  
        //2、我方飞机与敌方飞机碰撞---我方子弹&敌方飞机消失--删除操作
        enemys.forEach((enemy,eIndex)=>{
          bullets.forEach((bullet,bIndex)=>{
            if(hitTestObject(enemy,bullet)){
              //低层次代码
              //销毁我方子弹 & 敌方飞机
              // enemys.splice(eIndex,1); //旧版
              hitEnemy(enemy, eIndex);    //新版：触发两次，才会销毁敌机
              bullets.splice(bIndex,1);
            }
          })
        })
      }
      onMounted(()=>{
        game.ticker.add(handelTicker);
      })
      onUnmounted(()=>{
        game.ticker.remove(handelTicker);
      })
}