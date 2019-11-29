function Ajax(obj) {
  this.method = obj.method || '';
  this.url = obj.url || '';
  this.callback = obj.callback || '';
  this.data = obj.data || '';
};
/**
 * ajax 请求的封装
 *
 * @param {String} method 'post' or 'get'
 * @param {String} url 资源的地址
 * @param {Function} callback 回调的方法
 * @param {Object} data {requestData={"userToken":"8ed7ddfde5ca37849b7c43591957d7fb73adc2a1", "pageNumber": "1"}}
 * @returns
 */
Ajax.prototype.send = function (method, url, callback, data) {
  var method = method || this.method;
  var data = data || this.data;
  var url = url || this.url;
  var callback = callback || this.callback;
  var xhr = new XMLHttpRequest(); //新建ajax请求，不兼容IE7以下
  xhr.onreadystatechange = function () { //注册回调函数
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    } else if (xhr.readyState === 1) {
      callback("loading")
    }
  }
  xhr.onerror = function (err) {
    callback("error")
  }
  if (method === 'get') { //如果是get方法，需要把data中的数据转化作为url传递给服务器
    if (typeof data === 'object') {
      var data_send = '?';
      for (var key in data) {
        data_send += key + '=' + data[key];
        data_send += '&';
      }
      data_send = data_send.slice(0, -1);
      console.log(data_send);
    }
    xhr.withCredentials = true;
    xhr.open(method, url + data_send, true);
    xhr.send(null);
  } else if (method === 'post') { //如果是post，需要在头中添加content-type说明
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // 拼接可以发送过去可以通过的
    // 形式 'requestData={"userToken":"8ed7ddfde5ca37849b7c43591957d7fb73adc2a1", "pageNumber": "1"}'
    var data_post = ''
    for (let key in data) {
      for (let item in data[key]) {
        data_post = data_post + `"${item}":"${data[key][item]}",`
      }
      data_post = data_post.slice(0, data_post.length - 1);
      data_post = `${key}={${data_post}}`;
    }
    xhr.send(data_post); //发送的数据需要转化成JSON格式
  } else {
    console.log('不识别的方法:' + method);
    return false;
  }
}