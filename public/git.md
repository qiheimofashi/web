# git 基本使用

1. 创建git数据创库

```powershell
> git init
```

2. 查看当前创库的状态

```powershell
> git status
```
> 1. 未被管理的状态 U
> 2. 新增加状态,表示已经加入本地暂存区   A
> 3. 已经被管理,但在工作区被修改的文件   M
> 4. 已经被形成版本状态  C

3. 添加文件命令

```powershell
> git add .
```

4. 提交文件到创库

```powershell
> git commit -m "一句话(提交数据的原因)"
```

5. 删除文件

```powershell
> git rm 文件名
```

6. 回退版本

```powershell
> git reset --hard 版本号
```

7. 分支管理

```powershell
> git branch #查看分支
> git branch new #创建新分支,名称为new
> git checkout new #切换分支
> git branch -d new #删除分支
> git merge [分支名] #合并分支

8. 全局设置

```powershell
git config --global user.email "email"
git config --global user.name "name"
```

9. vscode中集成git使用

在vscode中已经集成基本的git图形操作功能.但还有功能更加强大的插件可以使用!
gitlens是非常流行的git图形增强操作插件
我们可以在吃阿金操作图形添加该插件

10. 远程创库

...powershell
# 设置全局设置
git config --global user.email "17687920152@163.com"
git config --global user.name "liangjiapengweb"
# 链接远程仓库
git remote add origin https://gitee.com/liangjiapengweb/todos.git
# 远程仓库的操作
git remote -v  查看链接状态
git remote show [仓库地址] 显示某个仓库信息
# 上传远程仓库
git push -u origin(仓库名) "main(分支名)"
...
 
# es6 
# Promise对象
1. Promise对象有两个特点
> 1. 对象的状态不受外界影响,Promise对象代表一个异步操作,有三种状态;
> pending:初始状态,不是成功或失败;
> resolve:意味着操作成功
> rejected:操作失败
> 2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
> new Promise((resolve.rejected)=>{});



# 基本转换形式

```powershell
function 函数名(参数列表) {
  return new Promise((resolve, reject) => {
    // 真正的函数执行
    if (执行成功) resolve(结果);
    else reject(错误);
  })
}
```
# .then
then方法是定义在原型对象Promise。它的作用是为Promise实例添加状态改变的回调函数。then方法的第一个参数是resolve状态的回调函数，第二个参数(可选)是rejected的回调函数.
```powerchel;
promise.then(resolve) 返回成功的结果
promise.the(null,rejected) 返回失败的结果
```
# .catch
.catch()和promise.the(null,rejected)是一样的,用于指定发生错误是的回调函数.
Promise.then((resolve)=>{
    console.log(resolve);返回成功信息
}).catch((rejected)=>{
    console.log(rejected)返回错误信息
});
如果前方有多个.then,.catch可以返回其中某个的错误信息.
