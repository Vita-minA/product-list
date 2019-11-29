// 实现分页加载
// 当前页码
var page = 1
function Paging() {
}
Paging.prototype.loadPage = function () {
  // 请求新的数据
  // window.addEventListener('scroll', () => {
    // 三个高度
    var load = arguments[arguments.length - 1];
    var contentH = document.body.scrollHeight;
    var seeHeight = document.body.clientHeight;
    var scrollTop = document.body.scrollTop;
    if (contentH < seeHeight + scrollTop + 1) {
      if (load.load_state === load_idle) {
        page += 1;
        console.log(`page:${page}`);
        var http = new Http();
        http.request(load, page);
      }
    }
  // })
}

// loading 的要求：
// 1.要有三种状态的判断 -- loading error finish
// 状态值 --> 自然是请求的状态，如何获得请求状态？

// 在 ajax 的状态值中，加上这么一个 onReadyStatusChange其他状态返回 loading
// loading 状态下：显示 div
// loaidng 状态下：取消对懒加载的监听以及分页显示的监听
// 非 loading 状态下：移除 div 注意释放内存 （但是我们没有方法略略略）
// 恢复监听
// 如何添加 div？
// 1.先不考虑出现的动画效果，先设置 div 高度为 0,loading状态为合适高度