const port = 3333;
const express = require("express");
const app = express();
app.use(express.static("node、Express"));
// app.use("/", (req, res) => {
//     res.send(`<!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>

//     <body>
//        <form action="post" method="/test">
//     <input type="text" name="user">
//     <input type="password" name="pass">
//     <input type="submit" value="登陆">
//     </form>
//     </body>

//     </html>`)
// })
app.post("/", (req, res) => {
    console.log(1);
    console.log(req.body.user)
})


app.listen(port, () => {
    console.log(`启动成功:http://localhost:${port}`);
})