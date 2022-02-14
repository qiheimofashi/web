const port = 3333;
//导入express包
const { application } = require("express");
const express = require("express");

// 生成 express服务实例 Application extends Router
const app = express();

//使用中间件 解析body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//自定义中间件打印路由处理时间
const timer = (req, res, next) => {
    const start = new Date();
    next();
    const end = new Date();
    console.log(end.getMilliseconds() - start.getMilliseconds());
}
// app.use(timer);
//路由
app.get('/abc', timer, (req, res) => {
    throw new Error("haha");
    // res.send("<h1 style='color:red'>hello,world</h1>")
})
app.get('/hello', (req, res) => {
    res.send("haha");
})
// //使用静态文件服务
app.use(express.static("public"));

//全局错误处理
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ success: false, message: err.message });
})


//启动服务监听
app.listen(port, () => {
    console.log(`服务器启动成功:http://localhost:${port}`)
});