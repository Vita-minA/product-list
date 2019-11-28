;
(function () { //立即执行函数，避免污染全局变量
  var load = new Load();
  var http = new Http();
  window.onload = http.request(load, 1);
  paging(load);
  window.addEventListener("scroll", load.throttle(load.lazyload, 500, 1000));
  // window.addEventListener("scroll", list);
  // window.onscroll = function (e) {
  //   load.throttle(load.lazyload, 500, 1000);
  // }
})();