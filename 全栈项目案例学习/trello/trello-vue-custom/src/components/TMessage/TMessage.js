// 自己编码---封装提示框组件，以及优化，挂载全局使用！！！
import Vue from 'vue';
import TMessage from "./TMessage.vue";

// new vue 是新建 vue 对象，需要绑定元素的。
// vue.extend 是新建 vue 组件，使用依赖于 vue 对象。
let TMessageClass = Vue.extend(TMessage); //TMessage对象参数，使用extend()返回给我们一个构造函数

/*
    工厂函数：
    1、创建一个Message组件对象
    2、管理TMessage组件对象队列
*/
let instances = []
function Message(data){
    data = data || {};
    if(typeof data === 'string'){
        data ={
            message: data
        }
    }
    data.onClose = function() {
        Message.close(instance);
    };
    let instance = new TMessageClass({ //【instance就是Message实例】
        data
    })
    instance.$mount(); //$el
    document.body.appendChild(instance.$el) //body中添加一个子节点
    //注意1：如上操作，多个提示框同时存在，会导致只能看见一个，另外的都已重叠在一起！！！如下解决处理

    //注意2：为每个提示框增加间隔控制，
    //第一个提示框：第一个top
    //第二个提示框：(第一个top + 第一个自身高度) + 第二个top
    //第三个提示框：(第一个top + 第一个自身高度 +  第二个top) + 第二个自身高度 + 第三个top
    //以此类推
    let offset = data.offset || 20;
    let offsetTop = offset;
    instances.forEach(item => {
        offsetTop += item.$el.offsetHeight + offset
    })
    instance.$el.style.top = offsetTop +'px';
    instances.push(instance)

    // this.$message({ message:'222',duration: 3000 })
    // 注意3：每个提示框都有间隔duration时间的设置，提示框1-1000s，提示框2-3000s，提示框3-2000s
    // 消失顺序：提示框1，提示框3，提示框2，
    //【问题来了：提示框2消失了，提示框3的位置应该顺上去，而不是一直固定在 提示框2下面不动！！！】
}

['info','success','error','warning'].forEach(type => {
    Message[type] = function(data){
        if(typeof data === 'string'){
            data ={
                message: data
            }
        }
        data.type = type
        return Message({ data })
    }
})

//提示框有序关闭：如--提示框2先消失，提示框3后消失--那么提示框3需要往事顺移位置，平滑过渡；
Message.close = function (instance){
    /*
    *  获取当前instance高度，
    *  把这个instance后面的所有实例，往上移动；【所有实例的top-减去实例高度 - 减去实例偏移margin-top】
    */
    let removeHeight = instance.$el.offsetHeight + instance.offset;
    let index = instances.findIndex( item => item === instance );//具体是第几个提示框
    instances = instances.filter( item => item !== instance );//实例对象组里，去除当前index的对象

    for (let i = index; i<instances.length; i++) {
        instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px';
    }
}

export default Message;