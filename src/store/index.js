//vuex
import {createStore} from "vuex"
import { generateId } from "../utils/generateId.js";
const createTodoItem = (context) => {
    return {
      id: generateId(),
      context,
      state: "active",
    };
};
export default createStore ({
    state: {
        todoList: [
            {
                context: '吃饭',
                id: 1,
                state: 'completed'
            },
            {
                context: '睡觉',
                id: 2,
                state: 'active'
            },
            {
                context: '摸鱼',
                id: 3,
                state: 'active'
            }
        ]
    },
    mutations: {
        //添加任务
        addTodo(state, { context }) {
            // create new todoItem
            state.todoList.push(createTodoItem(context));
        },

        //删除任务
        removeTodo(state, { id }) {
            state.todoList = state.todoList.filter((todo) => todo.id !== id);
        },

        //完成任务
        completeTodo(state, { id }) {
            const todoItem = state.todoList.find((todo) => todo.id === id);
            const isCompleted = (todo) => todo.state === "completed";
      
            if (todoItem) {
              todoItem.state = isCompleted(todoItem) ? "active" : "completed";
            }
        },

    },
    actions:{},
    module:{}
})