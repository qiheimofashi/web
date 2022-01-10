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
```

8. vscode中集成git使用

在vscode中已经集成基本的git图形操作功能.单还有功能更加强大的插件可以使用!
gitlens是非常流行的git图形增强操作插件
我们可以在吃阿金操作图形添加该插件