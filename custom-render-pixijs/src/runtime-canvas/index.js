// 创建自己的渲染器 runtime-canvas
import { createRenderer } from "vue"; //创建自己的渲染器
import { Graphics } from "pixi.js";

const renderer = createRenderer ({
    createElement() {
        const element = new Graphics();
        element.beginFill(0x9966FF);
        element.drawCircle(0, 0, 20);
        element.endFill();
        return element;
    },
    nextSibling() {},
    parentNode(node) {
      if (node) {
        return node.parent;
      }
    },
    insert(el, parent) {//渲染到视图
        if(el){ //需要注意加个判断，否则会报错
            parent.addChild(el);
        }
    },
    patchProp(el, key, prevValue, nextValue) {
      el[key] = nextValue;
    },
    remove(){},
    createComment(){},
    createText(){}
})

export function createApp(rootComponent){ //创建根容器
    return renderer.createApp(rootComponent)
}


