# NativeJScomponents
简单练习 es6 语法，尝试自己封装代码

### 1. Ajax

-  支持基本的 get、post 和 jsonp 跨域请求

-  get传参通过 url 传输，post 通过请求体传输

-  栗子：

   ```javascript
   ajax.(post|get|jsonp)({
     url: 'http://exmple.com',
     data: {
       tag: 'haha',
       name: 'tang'
     },
     callback(data){doSomething(data)}
   })
   ```

-  params:

   | Param       | Type          | Default                        |
   | ----------- | ------------- | ------------------------------ |
   | ur#l        | String        | ''                             |
   | data        | Object / null | null                           |
   | callback    | Function      | ()=>{}                         |
   | contentType | String        | application/x-www-form-urlenco |
   | async       | Boolean       | true                           |

### 2. Banner

### 3. Player

### 4. Scroll

