// 控制器类文件都存放到此文件内，创建一个控制器类文件---Test.ts
import { Controller, Get, Params, Query } from 'koa-ts-controllers';
import {IsNumberString} from 'class-validator';

//定义数据类型规则
// class GetUsersQuery {
//   @IsNumberString({ message:'page必须是数字' })
//   page: number;
// }


@Controller('/test')
class TestController {
    //当然仅仅只是这么一个类是没有什么作用的，
    //我们还需要把这个类变成控制类，并绑定其中的类方法到指定的路由中，这就需要用到 ` 装饰器`。
    
    //针对类的装饰器，被装饰的类就会成为一个控制器类，只有控制器类下的方法才能与路由进行绑定。
    //`koa-ts-controllers` 支持如下几个方法装饰器： **@Get(path)**  **@Post(path)**  **@Patch(path)**  **@Put(path)**  **@Delete(path)**
    
    // @Get('/hello')
    // async sayHello () {
    //     console.log('Helllo Test!')
    // }

    @Get('/user/:id')
  	public async index(
  		@Params() params: {id: number}
  	) {
		console.log(params.id);
	  }

    @Get('/user/:id(\\d+)') //对链接后的参数校验
  	public async index2(
  			@Params() params: {id: number}
  	) {
				console.log(params);
		}

    // @Get('/users')
    // async getUsers(
    //     @Query() q: GetUsersQuery //数字类型规则
    // ) {
    //     // 业务逻辑出现了一些错误，比如用户不存在，用户名已经被注册了
    //     // 不存在该用户
    //     // if (false) {
    //     //     throw Boom.notFound('用户不存在', '这是错误的详细描述');
    //     // }
    //     // if (true) { // 用户名已经被注册了
    //     //     throw Boom.notFound('注册失败', '用户已经被注册了');
    //     // }
    //     return '传过来的query：' + JSON.stringify(q);
    // }

}