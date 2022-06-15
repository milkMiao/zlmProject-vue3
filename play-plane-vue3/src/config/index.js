export default {
    enemy: {
      //speed: 10,
      //配置界面：敌机的速度
      speed() {
        return Math.floor(Math.random() * 10) + 5;
      },
    },
  
    plane: {
      bullet: {
        speed: 10,
      },
    },
  };
  