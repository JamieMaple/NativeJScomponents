function jamieAjax(options){
  'use strict'

  let url = options.url || '',                            // request url set
      type = (options.type || "get").toLowerCase(),       // request type, defalt : get
      params = options.params || null,                          // request data
      contentType = options.contentType || '',            // request header set
      dataType = options.dataType || '',                  // request type set
      async = options.async || true,                      // request async
      timeOut = options.timeOut,                          // request time out
      before = options.before || (() => {}),              // before send        
      error = options.error || (() => {}),                // error handle
      success = options.success || (() => {})             // sucess handle
  
  if (params && params instanceof Object) {
    for(key in params) {

    }
  }

  if (type === 'jsonp') {
    createJSONP()
  } else {
    createXML()
  }
    

  //编码数据
  function setData() {
    //设置对象的遍码
      function setObjData(data, parentName) {
          function encodeData(name, value, parentName) {
              var items = [];
              name = parentName === undefined ? name : parentName + "[" + name + "]";
              if (typeof value === "object" && value !== null) {
                  items = items.concat(setObjData(value, name));
              } else {
                  name = encodeURIComponent(name);
                  value = encodeURIComponent(value);
                  items.push(name + "=" + value);
              }
              return items;
          }
          var arr = [],value;
          if (Object.prototype.toString.call(data) == '[object Array]') {
              for (var i = 0, len = data.length; i < len; i++) {
                  value = data[i];
                  arr = arr.concat(encodeData( typeof value == "object"?i:"", value, parentName));
              }
          } else if (Object.prototype.toString.call(data) == '[object Object]') {
              for (var key in data) {
                  value = data[key];
                  arr = arr.concat(encodeData(key, value, parentName));
              }
          }
          return arr;
      };
      //设置字符串的遍码，字符串的格式为：a=1&b=2;
      function setStrData(data) {
          var arr = data.split("&");
          for (var i = 0, len = arr.length; i < len; i++) {
              name = encodeURIComponent(arr[i].split("=")[0]);
              value = encodeURIComponent(arr[i].split("=")[1]);
              arr[i] = name + "=" + value;
          }
          return arr;
      }

      if (data) {
          if (typeof data === "string") {
              data = setStrData(data);
          } else if (typeof data === "object") {
              data = setObjData(data);
          }
          data = data.join("&").replace("/%20/g", "+");
          //若是使用get方法或JSONP，则手动添加到URL中
          if (type === "get" || dataType === "jsonp") {
              url += url.indexOf("?") > -1 ? (url.indexOf("=") > -1 ? "&" + data : data) : "?" + data;
          }
      }
  }
  function createXML() {
    // traditional compatible ie6 <=
    function getXHR() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
      }else {
        let versions = ["Microsoft", "msxm3", "msxml2", "msxml1"]
        for (let i = 0, length = versions.length; i < length; i++) {
          let version = versions[i]+'.XMLHTTP'
          return ActiveXObject(version)
        }
      }
    }
    // 惰性函数处理兼容性
    var xhr = getXHR()
    xhr.open(type, url, async)
    xhr.onreadyStateChange = function() {
      if (this.readyState === 4) {
        if ((this.status >= 200 && this.status < 300) || this.status === 304) {
          success(this.responseText)
        } else {
          error(this.status, this.statusText)
        }
      }
    }
    xhr.send(type === 'get'? null : params)
  }
  function createJSONP() {
    let script = document.createElement('script'),
        random_part = (Math.random()*1000),
        callback = '_callback'+new Date().getTime()+Math.round(Math.random()*10000000)
    window[callback] = (data) => {
      document.head.removeChild(script)
      success(data)
    }
    script.src = url + (url.indexOf('?') > -1? '&' : "?") + 'callback='+callback
    script.type= 'text/javascript'
    document.head.appendChild(script)
  }
}