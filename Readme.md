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
```

2. 用户登陆
```javascript
{
    path:'/login',
    method:'POST',
    data:{
        username:String,
        password:String,

    },
    result:{
        success:Boolean,
        message:String,
        errors:{
            username:[String,..],
            ...
        }
    }
}
```

3. 用户登出
```javascript
{
    path:'/logout',
    method:'GET',
    result:{
        success:Boolean,
        message:String
    },
    user:User
}
```

4. 获取用户的代办列表
```javascript
{
    path:'/todos',
    method:'GET',
    params:{
        days:Number,
        priority:String,
        isFinished:String,
        limit:Number,
        offset:Number,
    },
    result:{
        success:Boolean,
        message:String,
        query:{
            count:Number,
            limit:Number,
            offset:Number,
            page:Number,
            results:[{id,title,description,priority,...},...]
        }
    }
}

```

5. 添加新代办
```javascript
{
    path:'/tudos',
    method:'POST',
    data:{
        title:String,
        description:String.
        priority:String
    }
    result:{
        success:Boolean,
        message:String,
        todo:Todo
    }
}

```

6. 修改代办信息
```javascript
{
    path:'/todos',
    method:'PUT',
    data:{
        title:String.,
        description:String,
        priority:String
    }
    result:{
        success:Boolean,
        message:String,
        todo:Todo
    }
}
```

7. 删除代办
```javascript
{
    path:'/todos/:tid,
    method:'DELETE',
    result:{
        success:Boolean,
        message:String
    }
}
```
8. 完成代办
```javascript
{
    path:'/todos/:tid',
    method:'PUT',
    result:{
        success:Boolean,
        message:String,
        todo:Todo
    }
}
```

9. 统计代办完成情况
```javascript
{
    path:'/todos/stat',
    method:'GET',
    result:{
        success:true,
        query:{
            count:Number,
            finished:[{
                priority:String,
                count:Number
            },....],
            notFinish:[
                {priority:String,
                count:Number},...
            ]
        }
    }
}
```

10. 查询用户登陆信息
```javascript
{
    path:'/user/info',
    method:'GET',
    result:{
         success:Boolean
    }
}
```