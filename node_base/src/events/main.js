import { log } from "../../logconfig.js";

import EventEmitter from "events";
import { search } from "./utils.js";
/*
 * EventEmitter 是使用的是观察者模式，可以额昂一个对象上注册多个事件，
 * 在对象上发生对应的事件的时候调用注册好的回调事件:
 *  > on 用于注册事件
 *  > emit 用于触发事件
 *  > removeListener 用于移除事件, 除了需要指定移除的事件名称，还需要指定回调函数
 *    回调函数不匹配则移除不了任何内容，如果在事件上注册了多个监听器需要移除多次，
 *    每次只能移除一个监听器。因此想要移除监听器，这个监听器必须是具名函数。
 *  > removeAllListeners 用于移除所有事件
 *  > listeners 用于获取事件的监听器数组
 *  > setMaxListeners 用于设置最大监听器数量
 *  > getMaxListeners 用于获取最大监听器数量
 *  > once 用于注册一次性事件
 *  > prependListener 用于注册事件，并且在事件触发前调用
 *  > prependOnceListener 用于注册一次性事件，并且在事件触发前调用
 *  > eventNames 用于获取所有事件名称
 *  > listenerCount 用于获取事件的监听器数量
 */

// 继承之后，可以规划自己的方法，还可以调用父类的方法
class MyEventEmitter extends EventEmitter {}

// 对象的实例化
const event = new MyEventEmitter();

// 绑定方法，回调函数
event.on("play", (value) => {
  console.log(value);
});

// 事件名称重复，调用的时候会触发两次。
event.on("play", (value) => {
  console.log(value);
});

// 获取到注册的 play事件, 由于 play 事件中注册了两次
// 内部处理的时候会将两个回调函数添加到一个数组中，
// 触发这个事件的时候会按照数组中的顺序依次调用
console.log(event.listeners("play"));

// once 绑定的事件只能运行一次
// 执行完成后，事件被移除
event.once("first", (value) => {
  console.log(value);
});

// 触发事件
event.emit("play", "hello");
event.emit("first", "first");
//
event.emit("first", "second");
// 此时 first 事件执行后被移除
console.log(event.eventNames());

// 这里移除的时候需要指定监听器事件，这里使用的是匿名函数的形式，
// 这里的移除是无效的
event.removeListener("play", () => {
  console.log("remove play");
});
event.removeAllListeners();

// 使用search("pattern") 方法在文件中查找对应的内容
// 找到触发相应的事件
// 找不到触发找不到事件
search("solo")
  .on("found", () => {
    log.info("found");
  })
  .on("notfound", () => {
    log.info("notfound");
  })
  .on("error", (error) => {
    if (error) throw error;
    console.log(err);
  });
