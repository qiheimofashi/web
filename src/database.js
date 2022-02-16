//导入mysql包
const mysql = require("mysql");

//将回调函数封装为 Promise 方式
class MySql {
    //构造函数
    constructor(config) {
        //产生数据库连接池对象
        this.pool = mysql.createPool(config);
    }
    /**
     * query 执行SQL语句
     * 
     * @param {string} sql 语句 
     * @param {Array} values  参数数组
     * @returns Promise<Array>
     */
    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, values, (error, results, fields) => {
                if (error) return reject(error);
                resolve([results, fields]);
            });
        });
    }
    /**
     * findOne
     * 只返回一条记录。适合执行聚合语句
     * @param {string} sql select 语句
     * @param {Array} values 参数数组
     * @returns Promise<any>
     */
    findOne(sql, values) {
        const [[one]] = this.query(sql, values);
        return one
    }
    /**
     * close 关闭连接时对象
     * 
     * @returns void
     */
    close() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}