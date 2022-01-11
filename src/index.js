const port = 3333;
//导入express包
const { application } = require("express");
const express = require("express");

// 生成 express服务实例
const app = express();

//使用静态文件服务
app.use(express.static("public"));

//启动服务监听
app.listen(port, () => {
    console.log(`服务器启动成功:http://localhost:${port}`)
});