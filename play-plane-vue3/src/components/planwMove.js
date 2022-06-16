import { onMounted,onUnmounted } from 'vue'
import { game } from '../game'
//plane飞机移动--丝滑移动--代码重构优化
//解决：飞机上下左右移动时的，流畅度！！！

export function planeMove (planeInfo){
    console.log('planeInfo', planeInfo)
    //方法二：【新版】
    //我方飞机-上下左右移动操作
    // function move() {
    //     const speed = 10;
    //     // let keyCode=''

    //     //方法一：键盘抬起--清空handleKeyUp ， 键盘按下--赋值handleKeyDown，如下函数
    //     //方法二：优化算法
    //     let leftAndRightKeyCode = ''
    //     let upAndDownKeyCode = ''

    //     function handleKeyUp(e){//键盘抬起--清空
    //         console.log('键盘按下', e.code)
    //         // keyCode = ''
    //         if(e.code =='ArrowUp' || e.code =='ArrowDown'){
    //             upAndDownKeyCode = ''
    //         }
    //         if(e.code =='ArrowLeft' || e.code =='ArrowRight'){
    //             leftAndRightKeyCode = ''
    //         }
    //     }
    //     function handleKeyDown(e){//键盘按下--赋值
    //         console.log('键盘弹起', e.code)
    //         // keyCode = e.code
    //         if(e.code =='ArrowUp' || e.code =='ArrowDown'){
    //             upAndDownKeyCode = e.code
    //         }
    //         if(e.code =='ArrowLeft' || e.code =='ArrowRight'){
    //             leftAndRightKeyCode = e.code
    //         }
    //     }

    //     //方法一：如下switch，只能一下操作一个按键
    //     //注意：switch这样写按一下控件，只能移动x或者y, 不能同时移动x和y，如何优化？【x和y同时存在--会写斜着走】

    //     //方法二：优化版---可以同时按下不同的按键，如下判断逻辑
    //     //注：上&左，上&右   下&左，下&右 【按键同时按下效果】也要注意事件监听处理
    //     //      优化方法二：从算法的角度出发
    //     function handleTicker() {//触发飞机移动
    //         if(upAndDownKeyCode =='ArrowUp' || upAndDownKeyCode=='ArrowDown'){ 
    //             if(upAndDownKeyCode =='ArrowUp'){
    //                 planeInfo.y -= speed;
    //             } else{
    //                 planeInfo.y += speed;
    //             }
    //         }
    //         if(leftAndRightKeyCode=='ArrowLeft' || leftAndRightKeyCode=='ArrowRight'){
    //             if(leftAndRightKeyCode=='ArrowLeft'){
    //                 planeInfo.x -= speed;
    //             }else{
    //                 planeInfo.x += speed;
    //             }
    //         }
    //     }
    //     onMounted(() => {
    //         game.ticker.add(handleTicker)
    //         window.addEventListener("keyup", handleKeyUp); //这样操作更流畅了
    //         window.addEventListener("keydown", handleKeyDown);
    //     });
    //     onUnmounted(() => {
    //         game.ticker.remove(handleTicker)
    //         window.removeEventListener("keyup", handleKeyUp);
    //         window.removeEventListener("keydown", handleKeyDown);
    //     });
    // }
    //   move()

    //方法三：算法上优化方法二 【最新版】
   function move2(){
        const speed = 10;
        //   let leftAndRightKeyCode = "";
        //   let upAndDownKeyCode = "";
    
        const leftAndRightArr = [];
        const upAndDownArr = [];
    
        const upCommand = {
            type: "upAndDown",
            name: "up",
            dir: -1,
        };
    
        const downCommand = {
            type: "upAndDown",
            name: "down",
            dir: 1,
        };
    
        const leftCommand = {
            type: "leftAndRight",
            name: "left",
            dir: -1,
        };
    
        const rightCommand = {
            type: "leftAndRight",
            name: "right",
            dir: 1,
        };
    
        const map = {
            ArrowUp: upCommand,
            ArrowDown: downCommand,
            ArrowLeft: leftCommand,
            ArrowRight: rightCommand,
        };
    
        function getArrByCommand(command) { //封装
            if (command.type === "leftAndRight") {
                return leftAndRightArr;
            } else {
                return upAndDownArr;
            }
        }
        function addCommand(command) {
            const arr = getArrByCommand(command);
            arr.unshift(command);
        }
    
        function removeCommand(command) {
            const arr = getArrByCommand(command);
            const index = arr.indexOf(command);
            arr.splice(index, 1);
        }
    
        function isExistCommand(command) {//封装
            const arr = getArrByCommand(command);
            return arr.indexOf(command) !== -1;
        }
    
        function handleKeyup(e) {
            const command = map[e.code];
        
            if (command && isExistCommand(command)) {
                removeCommand(command);
            }
        }
    
        function handleKeydown(e) {//按下按键
            // e.code
            const command = map[e.code]; //command：有值--说明按下了--上下左右按键
            if (command && !isExistCommand(command)) {
                //tips: 如果不存在上，我再添加，其余按键也是如此；
                // 如果不存在的话，那么在添加
                addCommand(command);
            }
        }
    
        function handleTicker() {
            const leftAndRightCommand = leftAndRightArr[0];
            if (leftAndRightCommand) {
                planeInfo.x += leftAndRightCommand.dir * speed;
            }
        
            const upAndDownCommand = upAndDownArr[0];
            if (upAndDownCommand) {
                planeInfo.y += upAndDownCommand.dir * speed;
            }
        }

        onMounted(() => {
            game.ticker.add(handleTicker)
            window.addEventListener("keyup", handleKeyup);
            window.addEventListener("keydown", handleKeydown);
        });
        onUnmounted(() => {
            game.ticker.remove(handleTicker)
            window.removeEventListener("keyup", handleKeyup);
            window.removeEventListener("keydown", handleKeydown);
        });
    }
    move2()

    //方法一：我方飞机-上下左右移动操作【旧版】
    // function move() {
    //   const speed = 10;
    //   function handleMove(e) {
    //  方法一：如下switch，只能一下操作一个按键
    //  注意：switch这样写按一下控件，只能移动x或者y, 不能同时移动x和y，如何优化？【x和y同时存在--会写斜着走】
    //     switch (e.code) {
    //       case "ArrowUp":
    //         planeInfo.y -= speed;
    //         break;
    //       case "ArrowDown":
    //         planeInfo.y += speed;
    //         break;
    //       case "ArrowLeft":
    //         planeInfo.x -= speed;
    //         break;
    //       case "ArrowRight":
    //         planeInfo.x += speed;
    //         break;
    //     }
    //   }
    //   onMounted(() => {
    //     window.addEventListener("keyup", handleMove);
    //   });
    //   onUnmounted(() => {
    //     window.removeEventListener("keyup", handleMove);
    //   });
    // }
    // move()
}