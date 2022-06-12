import { createRenderer } from "vue";
import { Container, Sprite, Texture } from "pixi.js";

const renderer = createRenderer({
  createElement(type) {
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        element = new Sprite();
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el) {
      parent.addChild(el);
    }
  },

  patchProp(el, key, prevValue, nextValue) {
//     console.log(key);
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);

        break;

      default:
        el[key] = nextValue;
        break;
    }
  },
  parentNode(node) {
    return node.parent;
  },
  remove(el) {
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },
  createComment() {},
  nextSibling() {},
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
