const ajaxObj = {
  _default: {
    url  : '',
    data : null,
    contentType: 'application/x-www-form-urlencoded',
    callback(data){},
    async : true
  },
  _init(params) {
    return Object.assign({}, this._default, params)
  },
  _request() {
    // 兼容性问题
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest()
    }
    const versions = [
      "MSXML2.XmlHttp.6.0",
      "MSXML2.XmlHttp.5.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.2.0",
      "Microsoft.XmlHttp"
    ]
    let xhr
    for (let i = 0, length = versions.length; i < length; i++) {
      try {
        xhr = new ActiveXObject(versions[i])
        break;
      }catch(e){}
    }
    return xhr
  },
  _objToString(data) {
    let arr = []
    for (key in data){
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      // q1 arr.push(`${key}=${data[key]}`)
    }
    return arr.join('&')
  },
  _send(type, params) {
    let xml = this._request()
    xml.open(type, params.url, params.async)
    xml.setRequestHeader('Content-type', params.contentType)
    xml.onreadystatechange = function() {
      if (this.readyState === 4) {
        params.callback(this.responseText)
      }
    }
    xml.send(params.data)
  },
  post(params) {
    params.data = this._objToString(params.data)
    params = this._init(params)
    this._send('post', params)
  },
  get(params) {
    let url_query = this._objToString(params.data)
    if (url_query) {
      params.url += '?'+url_query
    } 
    params.data = null

    params = this._init(params)
    this._send('get', params)
  },
  jsonp(params) {
    
    let script = document.createElement('script'),
        url_query = this._objToString(params.data)
        callback = 'JSONP'+new Date().getMinutes()
    if (url_query) {
      params.url += '?'+url_query
      params.url += '&callback='+callback
    } else {
      params.url +='?callback='+callback
    }
    
    window[callback] = (data) => {
      document.head.removeChild(script)
      params.callback(data)
    }
    if (!params.catch) {
      params.url += '&_='+new Date().getTime() + Math.round(Math.random()*10000)
    } 

    script.src=params.url
    document.head.appendChild(script)
  }
}
