// 老师编码案例参考
import Vue from 'vue';
import TMessage from "./TMessage.vue";

// new vue 是新建 vue 对象，需要绑定元素的。
// vue.extend 是新建 vue 组件，使用依赖于 vue 对象。
let TMessageConstructor = Vue.extend(TMessage); //TMessage对象参数，返回给我们一个构造函数

let instance;
let instances = [];
let seed = 1;

//message 充当于工厂函数
const Message = function(options) {
    options = options || {};
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    let userOnClose = options.onClose;
    let id = 'message_' + seed++;

    options.onClose = function() {
        Message.close(id, userOnClose);
    };
    instance = new TMessageConstructor({ //组件实例
        data: options
    });
    instance.id = id;

    instance.$mount(); //$el
    document.body.appendChild(instance.$el);

    let verticalOffset = options.offset || 20;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    instance.verticalOffset = verticalOffset;
    instance.$el.style.zIndex = 1000000 + seed;
    instances.push(instance);
    return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});

Message.close = function(id, userOnClose) {
    let len = instances.length;
    let index = -1;
    let removedHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for (let i = index; i < len - 1 ; i++) {
        let dom = instances[i].$el;
        dom.style['top'] =
            parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};

Message.closeAll = function() {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;