
const express = require("express");
const app = express();
const port = 3333;
app.use(express.static("./"));

app.listen(port, () => {
    console.log(`服务器开启成功:http://localhost:${port}`)
});