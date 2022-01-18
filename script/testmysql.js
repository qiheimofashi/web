//导入MYSQL包
const mysql = require("mysql");
//创建数据库链接对象
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test",
    connectionLimit: 10
})
//打开链接
//执行查询语句
connection.query('SELECT  * from score', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    //关闭链接
    connection.end((err) => { console.log("数据库已经关闭") });
});
