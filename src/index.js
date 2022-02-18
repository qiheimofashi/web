const part = 3333;
//导入express包
const express = require("express");
//异步错误获取补丁
require("express-async-errors");
//导入加密模块的函数
const { makePassword, checkPassword } = require("./utils");
//生成 express 服务实例 Application extends Router
const app = express();
// 使用中间键 解析body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session 中间件
const session = require("express-session");
app.use(session({
    secret: "switch a good secret key",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 30 * 60 * 1000
    },
}))

//自定义中间件打印路由处理时间
// const timer = (req, res, next) => {
//     const start = new Date();
//     next();
//     const end = new Date();
//     console.log(end.getMilliseconds() - start.getMilliseconds())
// }
// app.use(timer);

//使用静态文件服务
app.use(express.static("public"));
// 导入mysql的封装模块
const { Mysql } = require("./database"),
    // db 初始化数据库对象
    db = new Mysql({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'todos',
        connectionLimit: 10,
    })
// 定义路由:url 地址的名称
//   / ： 根据根路由
//  通过地址path映射不同的功能function
// app,method(path,(request,response) => {})

// 用户注册
app.post("/register", async (req, res) => {
    const { username, password, nickname } = req.body;
    //输入用户信息
    const [results] = await db.query("insert into user (username,password,nickname) values(?,?,?)", [username, makePassword(password), nickname]);
    //插入刚刚插入的用户信息
    const user = await db.findOne("select * from user where id = ?", [results.insertId]);
    res.send({
        success: true,
        user
    });
}).post('/login', async (req, res) => {
    const { username, password } = req.body;
    //根据用户名查询信息
    const user = await db.findOne("select * from user where username = ?", [username]);
    //判断密码是否输入正确
    if (user && checkPassword(password, user.password)) {
        //在会话 (session) 中保存用户信息
        req.session.userId = user.id;
        //响应客户端
        res.send({
            success: true,
            user
        })
    } else res.send({ success: false, message: "用户密码或错误" })
}).get("/logout",(req,res)=>{
  req.session.destroy();
  res.send({
      success:true,
      message:"用户注销成功"
  })
})
    .get('/user/info', async (req, res) => {
        res.send({ userId: req.session.userId });
    });



//全局错误处理
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ success: false, message: err.message });
})

//启动服务监听
app.listen(part, () => {
    console.log(`服务器已经启动：http://localhost:${part}`);
})