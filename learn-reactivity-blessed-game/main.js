
import {ref, effect} from '@vue/reactivity/dist/reactivity.esm-browser.js';

//响应式基础库学习
//核心：收集依赖，触发依赖
// const a = ref(10)
// let b = a.value +10
// console.log("b-----", b)

// 数据响应式
//计算属性
//watch
//watchEffect
// let b;
// effect(() => {
//   b = a.value + 10;
//   console.log(b);
// });
// a.value = 20 



// view视图--就是复杂一点的b（如上let b） -> 响应式数据
// const view = (content) => {
//   document.querySelector("#app").textContent = ``;

//   const div = document.createElement("div");
//   div.textContent = content.a.value;

//   document.querySelector("#app").append(div);
// };

// const content = {
//   a: ref(10),
// };

// effect(() => {//收集依赖
//   view(content);
// });

// // 更新值
// window.content = content;




//其实就是Vue3的原理
const App = {
    // template -> render
    render(content) {
      effect(() => {
        document.querySelector("#app").textContent = ``;
        const div = document.createElement("div");
        div.textContent = content.a.value;
        document.querySelector("#app").append(div);
      });
    },
  
    setup() { //注意：setup返回的就是响应式对象
      const a = ref("10");
      window.a = a;
      return {
        a,
      };
    },
  };
  
  App.render(App.setup());
