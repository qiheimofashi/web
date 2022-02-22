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
    secret: "switch a good secret key", //一个 String 类型的字符串，作为服务器端生成 session 的签名。
    resave: true,   //	强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
    saveUninitialized: true,    /*强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，
                                它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
                                (默 认:true)。建议手动添加。*/
    cookie: {
        secure: false, //true 以https的形式访问 false以http形式访问 默认值为true
        httpOnly: false,    //是否以http(s)形式发送cookie 默认值true
        maxAge: 30 * 60 * 1000  //设定一个utc过期时间
    },
}))

//导入参数验证中间件
const { body, param, query, validationResult } = require('express-validator');
const { send } = require("express/lib/response");
//将需要验证的参数保存为对象，以便重用。
const validators = {
    username: body('username')
        .trim() //去除前后空格
        .isLength({ min: 3, max: 16 })
        .withMessage("用户长度必须在3~16个之间"),
    password: body("password")
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("密码长度在6到20个之间"),
    confirmPassword: body("confirmPassword")
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("密码长度在6到20个之间")
        .custom((val, { req }) => {
            if (val != req.body.password) throw new Error("两次密码输入必须一致");
            return true;
        }),
    nickname: body("nickname")
        .notEmpty()
        .withMessage("昵称不能为空")
        .isLength({ max: 50 })
        .withMessage("昵称不能超过50个字符"),
    title: body("title")
        .notEmpty()
        .withMessage("标题不能为空")
        .isLength({ max: 100 })
        .withMessage("标题不能超过100个字符")
        .trim()
        .escape(),
    description: body("description")
        .isLength({ max: 255 })
        .withMessage("待办描述不应该超过255个字符")
        .trim()
        .escape(),
    priority: body("priority")
        .notEmpty().withMessage("优先级不能为空")
        .isIn(["normal", "important", "crucial"]).withMessage("请输入正确的优先级"),
    todoId: param("tid").notEmpty().toInt(),
    limit: query("limit").optional().toInt(),
    offset: query("offset").optional().toInt()
};
/**
 * validate 高阶函数：根据验证器生成中间件
 *
 * @param {array} validators 验证器数组
 * @returns function Express的中间件
 */
const validate = (validators) => {
    return async (req, res, next) => {
        await Promise.all(validators.map((v) => v.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        let err = {};
        for (let e of errors.array()) {
            if (e.param in err) err[e.param].push(e.msg);
            else err[e.param] = [e.msg];
        }
        res.json({ success: false, errors: err });
    };
};


//使用中间件静态文件服务
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
app.post("/register",
    validate([validators.username,
    validators.password,
    validators.confirmPassword,
    validators.nickname]), async (req, res) => {
        const { username, password, nickname } = req.body;
        const exist = await db.findOne("select * from user where username = ?", [username]);
        if (exist) {
            return res.send({ success: false, errors: { username: ["该用户名已经存在"] } })
        }
        //输入用户信息
        const [results] = await db.query("insert into user (username,password,nickname) values(?,?,?)", [username, makePassword(password), nickname]);
        //插入刚刚插入的用户信息
        const user = await db.findOne("select * from user where id = ?", [results.insertId]);
        res.send({
            success: true,
            user
        });
    })/*
    用户登陆
*/
    .post('/login',
        validate([validators.username,
        validators.password,
        ]), async (req, res) => {
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
        });
//创建路由对象,使得用户登陆状态检查中间件只作用于部分路由
const router = express.Router();
//创建用户登陆状态检查的中间件
router.use(async (req, res, next) => {
    //用过session.userId判断用户是否登陆
    if (!req.session.userId) {
        return res.status(401).send({ success: false, message: '用户尚未登陆' });
    }
    //为之后获取用户信息方便,将用户信息保存在req.user上
    req.user = await db.findOne("select * from user where id = ?", [req.session.userId])
    next();
});
/*
    用户注销
*/
router.get("/logout", (req, res) => {
    //清楚session信息
    req.session.destroy();
    res.send({
        success: true,
        message: "用户注销成功"
    })
})
/* 
    获取用户信息
*/.get('/user/info', (req, res) => {
    res.send({
        success: true,
        userId: req.user
    });
})
    /*
        新建代办
    */
    .post('/todos',
        validate([
            validators.title,
            validators.description,
            validators.priority
        ])
        , async (req, res) => {
            const { title, description, priority } = req.body;
            const [results] = await db.query('insert into todo (title,description,priority,user_id) values (?,?,?,?)', [title, description, priority, req.session.userId]);
            const todo = await db.findOne('select * from todo where id=?', results.insertId);
            res.send({
                success: true,
                todo
            })
        })
    /*
        修改代办信息 
    */
    .put("/todos/:tid",
        validate([
            validators.title,
            validators.description,
            validators.priority,
            validators.todoId
        ])
        , async (req, res) => {
            let todo = await db.findOne("select * from todo where id = ? and user_id = ?", [req.params.tid, req.session.userId])
            if (!todo) {
                return res.send({ success: false, message: "该代办信息不存在" })
            }
            if (todo.finished_at) return res.send({ success: false, message: "该代办信息已经完成不能修改!" })
            const { title, description, priority } = req.body;
            await db.query("update todo set title = ?,description = ?,priority = ? where id = ?", [title, description, priority, req.params.tid]);
            todo = await db.findOne("select * from todo where id = ?", [req.params.tid]);
            res.send({ success: true, todo });
        })
    /*
        完成删除代办
    */
    .delete("/todos/:tid", validate([validators.todoId]), async (req, res) => {
        let todo = await db.findOne("select * from todo where id = ? and user_id = ?", [req.params.tid, req.session.userId]);
        if (!todo) {
            return res.send({
                success: false,
                message: "未找到该条代办删除失败"
            })
        }
        await db.query("delete from todo where id = ? and user_id = ?", [req.params.tid, req.session.userId]);
        res.send({
            success: true,
            message: "代办删除成功"
        })
    })
    /*完成代办信息*/
    .put("/todos/finish/:tid", async (req, res) => {
        let todo = await db.findOne("select * from todo where id = ? and user_id = ?", [req.params.tid, req.session.userId]);
        if (!todo) return res.send({
            success: false,
            message: "找不到该代办信息"
        })
        if (todo.finished_at != null) {
            return res.send({
                success: false,
                message: "该代办已经完成"
            })
        }
        await db.query("update todo set finished_at = current_timestamp where id = ?", [req.params.tid]);
        todo = await db.findOne("select * from todo  where id = ? and user_id = ?", [req.params.tid, req.session.userId]);
        res.send({
            success: true,
            message: "完成操作成功",
            todo
        })
    })
    //获取用户代表列表
    .get("/todos", validate([
        validators.limit,
        validators.offset
    ]), async (req, res) => {
        const { days = 'all', priority = 'all', isFinished = 'all', limit = 10, offset = 0 } = await req.query
        const wheres = ["user_id = ?"], params = [req.user.id];
        if (days != 'all') {
            wheres.push(`created_at between date_add(now(),interval -${days} day) and now()`);
        }
        if (priority != 'all') {
            wheres.push('priority = ?');
            params.push(priority);
        }
        if (isFinished != 'all') {
            wheres.push(`finished_at is ${isFinished == 'true' ? "not" : ""} null`)
        }
        //获取查询的总数
        let sql = `select count(*) as count from todo where ${wheres.join(" and ")}`;
        const { count } = await db.findOne(sql, params);
        sql = `select * from todo where ${wheres.join(" and ")} order by created_at desc limit ${offset},${limit}`;
        const [results] = await db.query(sql, params);
        res.send({
            success: true,
            query: {
                sql,
                count,
                limit,
                offset,
                page: offset / limit + 1,
                results
            }
        })
    })

    .get("/todos/stat", async (req, res) => {
        const { id } = req.user,
            { count } = await db.findOne(
                `select count(*) as count from todo
                 where user_id = ?`
                , [id]),
            [finished] = await db.query(
                `select priority,count(*) as count from todo
                 where user_id = ? and finished_at is not null
                  group by priority`
                , [id]),
            [notFinished] = await db.query(
                `select priority,count(*) as count from todo
                 where user_id = ? and finished_at is null
                  group by priority`
                , [id]);
        res.send({
            success: true,
            query: {
                count,
                finished,
                notFinished
            }
        })
    })
//将路由作为中间件挂接 在/ 更路由上
app.use('/', router);

//全局错误处理
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ success: false, message: err.message });
})

//启动服务监听
app.listen(part, () => {
    console.log(`服务器已经启动：http://localhost:${part}`);
})