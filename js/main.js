;
(function () { //立即执行函数，避免污染全局变量
  var load = new Load();
  var http = new Http();
  var paging = new Paging(load);
  window.onload = http.request(load, 1);
  window.addEventListener("scroll", throttle(load.lazyload, 500, 1000));
  window.addEventListener("scroll", throttle(paging.loadPage, 500, 1000, load));
})();