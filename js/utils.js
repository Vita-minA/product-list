// 根据 classname 获取 dom元素
function my$(classname) {
  return document.getElementsByClassName(classname);
}
// 创建相应的 dom
function myCreate(element) {
  return document.createElement(element);
}
/**
 * 节流函数，避免频繁调用
 *
 * @param {Function} fun 调用的函数
 * @param {Number} delay 延迟的时间
 * @param {Number} time 间隔的时间
 * @returns
 */

var throttle = function (fun, delay, time) {
  var timeout = new Date();
  var startTime = new Date();
  return () => {
    var context = this;
    // if(arguments.length > 3) {
    //   var args = arguments[arguments.length - 1]
    // } else {
    //   var args = arguments;
    // }
    var args = arguments;
    // console.log(args);
    var curTime = new Date();
    clearTimeout(timeout);
    // 到达规定时间，触发 handler
    if (curTime - startTime >= time) {
      fun.apply(context, args);
      startTime = curTime;
    } else {
      timeout = setTimeout( () => {
        fun.apply(context, args);
      }, delay);
    }
  };
}