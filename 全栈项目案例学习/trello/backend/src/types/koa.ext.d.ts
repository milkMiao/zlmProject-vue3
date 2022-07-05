import koa from 'koa';

declare module 'koa' { //koa的扩展
    interface Context {
        userInfo: UserInfo
    }
}