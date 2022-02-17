# 代办列表应用参考

在本示例中提供如下实践参考:
1. 定义路由、静态文件服务
2. 使用回话对象 Session 实现用户状态的保存
3. 使用自定义 express 中间件实现对用户登陆状态的统一验证
4. 使用 express-validator

## 路由以及功能

1. 用户注册功能
```javascript
{
    path:'/register',
    method:'POST',
    data:{
        username:String,
        password:String,
        confirmPassword:String,
        nickname:String
    }
    result:{
        success:Boolean,
        message:String,
        user:User
    }

}