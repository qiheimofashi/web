//导入MYSQL包
const mysql = require("mysql");
// //创建数据库链接对象
// const connection = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "test",
//     connectionLimit: 10
// })
// //打开链接
// //执行查询语句
// connection.query('SELECT  * from score', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//     //关闭链接
//     connection.end((err) => { console.log("数据库已经关闭") });
// });




class Mysql {
    constructor(config) {
        this.pool = mysql.createPool(config)
    }
    query(sql, value) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, value, (error, results, fields) => {
                if (error) return reject(err);
                resolve([results, fields]);
            })
        })
    }
    close() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) return reject(err);
                resolve(console.log("关闭成功"));
            });
        })
    }
}

(async () => {
    const db = new Mysql({ user: 'root', password: "123456", database: "test" });
    const [results] = await db.query("select *from score");
    console.log(results);
    await db.close();
})();