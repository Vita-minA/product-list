function Http(obj = {}) {
  this.method = obj.method || 'post';
  this.url = obj.url || 'http://47.95.148.78/neckpets/getBlindBoxSeriesLitByTabType.json';
  this.action = obj.action || ''; //
  this.data = obj.data || {
    requestData: {
      'userToken': '8ed7ddfde5ca37849b7c43591957d7fb73adc2a1',
      'pageNumber': '1'
    }
  };
}
/**
 * request 方法：经进一步封装 ajax，将需要的配置写入类中避免多次写入数据并分配请求状态
 *
 * @param {Class} load main 中所实例化的的 load 类
 * @param {Number} pageNumber 当前加载的页数
 */
Http.prototype.request = function (load, pageNumber) {
  this.data.requestData['pageNumber'] = pageNumber;
  var ajax = new Ajax({
    method: this.method,
    url: this.url,
    callback: function (res) {
      if (res === "loading") {
        load.load_state = loading;
        load.show(res);
      } else if (!JSON.parse(res).data) { // 后面没有数据了，主要要看server传回来的数据有没有这样字段
        load.load_state = load_end;
        load.show(JSON.parse(res));
      } else if (res === "error") {
        load.load_state = load_error;
        load.show(res);
      } else {
        load.load_state = load_idle;
        load.show(JSON.parse(res));
      }
    },
    data: this.data
  });
  ajax.send();
}