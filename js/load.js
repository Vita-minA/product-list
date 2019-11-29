// 计数已经显示的图片的个数
var img_loaded = 0;

function Load() {
  // 计数已经显示的图片
  this.load_state = load_origin;
};
/**
 * 完成页面的加载
 *
 * @param {Object} res 解析后的报文
 */
Load.prototype.show = function (res) {
  // if (this.load_state === load_state) {
  //   return;
  // }
  // console.log(this.load_state);
  // 商品列表
  if (this.load_state === load_idle) {
    var goods_list = myCreate('div')
    goods_list.classList.add('goods-list');
    document.body.appendChild(goods_list);
    console.log("res:" + res)
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        var key = res.data[i];
        // 商品外层 div
        var div_goods = myCreate("div");
        div_goods.id = `goods-${key.seriesCode}`;
        div_goods.classList.add("goods-show");
        // div_goods.style.opacity = 0;
        goods_list.appendChild(div_goods);
        // 商品图片
        var img_goods = myCreate("img");
        img_goods.src = '';
        img_goods.alt = key.image;
        // img_goods.src = key.image;
        div_goods.appendChild(img_goods);
        // 添加商品的名称
        var span_name = myCreate("span");
        span_name.classList.add("goods-name");
        span_name.innerHTML = key.name;
        div_goods.appendChild(span_name);
        // 
        var div_item = myCreate("div");
        div_item.classList.add("goods-item");
        div_goods.appendChild(div_item);
        // 商品库存
        var span_count = myCreate("span");
        span_count.classList.add("goods-count");
        span_count.innerHTML = key.description;
        div_item.appendChild(span_count);
        // 商品价格
        var span_price = myCreate("span");
        span_price.classList.add("goods-price");
        span_price.innerHTML = '￥' + key.price;
        div_item.appendChild(span_price);
      }
    }
  }
  // load_box.classList.add("load_box");
  // 这里实现完，用 case 重写
  // console.log(this.load_state);
  if (this.load_state === load_idle) { // 成功
    var temp = document.getElementById('load_box');
    document.body.removeChild(temp);
  } else if (this.load_state === load_end) { // 已经是最后一页
    // 显示灰色的提示，几秒后消失
    document.getElementById('load_box').innerHTML = "这是最后一页了";
  } else if (this.load_state === load_error) { // 错误
    document.getElementById('load_box').innerHTML = "加载出现错误了";
    // 
  } else if (this.load_state === loading) { // 正在加载
    // 完成后消失
    var load_box = myCreate("div");
    document.body.appendChild(load_box);
    load_box.id = 'load_box';
    var load_span = myCreate("span");
    load_box.appendChild(load_span);
    load_span.innerHTML = "正在用力加载中";
  }
  this.lazyload();
  window.addEventListener("scroll", throttle(this.lazyload, 500, 1000));
}
/**
 * 懒加载：通过高度判断当页面滑到对应的 img 出现在可视区域时，为 src 赋值
 *
 */
Load.prototype.lazyload = function () {
  // var img = document.getElementsByClassName("goods-show");
  var img = document.getElementsByTagName("img");
  var num = img.length;
  var seeHeight = document.body.clientHeight; //可见区域高度
  var scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
  for (var i = img_loaded; i < num; i++) {
    if (img[i].offsetTop < seeHeight + scrollTop) {
      // img[i].style.opacity = 1;
      img[i].src = img[i].alt;
      img_loaded = i + 1;
    }
  }
}
