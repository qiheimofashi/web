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
```powershell
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

# ES6 let 和const命令
ES6新增了let命令用来声明变量，他的用法类似于var，但let声明的变量值作用域代码块。

# let变量不能在为声明之前使用(不存在变量提升)
```powershell
> test = 1; //报错
> let test
```
# 暂时性死区() 
块级作用域内存在的let变量，这个变量就绑定了所在的块级作用域，不在手外部的影响
```powershell
> var tmp = 123;
> if (true) {
> tmp = 'abc'; // 报错
> let tmp;
> }
```
# 块级作用域与函数声明
ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
//ES6严格模式
```powershell
> 'use strict';
> if (true){
> function (){
> //不会报错
> }
 }
>
```
# ES6规定，块级作用域之中，函数声明的语句的行为类似于let,在块级作用域之外不可引用。
```powershell
function f() {
  console.log("第一 f ")
}
function f2() {
//重复声明一次函数f
if (true) {
  function f() {
    console.log("第二f ")
    }
  }
  f(); //if里的 f()函数 实际上在 头部声明
}
f2();
```
# do 表达式
```powershell
do表达式能将块级作用域的值返回;
  let x = do {
      let a = 1;
      let b = 3;
      a + b + 1;
  };
  console.log(x);
```
# const 命令
const 声明一个只读的常量。一旦声明，常量的值就不能改变
```powershell
const pi = 3.13;
console.log(pi) //3.14
pi = 1;
//此时就会报错
```
# 顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在node指的是global对象。在ES5之中，顶层对选哪个属性与全局变量是等价的
```powershell
window.a = 1;
console.log(a); //a = 1
a = 2
console.log(window.a)//2
```
ES6为了改变这一点，一方面规定，var命令和function命令声明的全局变量，依旧是顶层对象的属性，但是let命令和const命令的全局变量，不属于顶层对象属性。也就是说从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
```powershell
var a = 1;
window.a//1
let b =`;
window.b//undefine
```
# ES6 变量的结构赋值
数组的结构赋值
基本用法
ES6允许按照一定的模式，从数组和对象中提取值，这被称为解构(Destructuring)以前，为变量赋值，只能直接指定值
ES5
var a =1;
var b =2;
var c =3; 
ES6允许写成
var [a,b,c] = [1,2,3];
# 解构赋值允许指定默认值
```powershell
var [foo = true] = [];
foo // true
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
//如果有一个数组成员为null默认值则不会生效
var [x =1]= [null];
x//null;
```
# 对象的解构赋值
```powershell
var {foo,bar} = {foo:"aaa",bar:"bbb"}
foo//"aaa"
bar//"bbb"
```
如果变量名与属性名不一致，必须写成下面这样。
```powershell
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
# 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```powershell
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
# 字符串的遍历器接口
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
字符串可以被for...of循环遍历。
还可以遍历0xFFFF的码点，传统for无法
可以遍历空位
```powershell
var text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "
for (let i of text) {
  console.log(i);
}
// "𠮷"
```
# 函数的扩展
在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
```powershell
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
```powershell
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
参数变量是默认声明的，所以不能用let或const再次声明。
```powershell
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```
结构对象赋值的默认值与函数参数的默认值赋值具体属性的对象。
```powershell
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```
# 函数length属性
函数的length属性失真情况
```powershell
(function (a = 5) {}).length // 0
//指定默认值后函数的length属性会失真
(function (a, b, c = 5) {}).length // 2
//3-1(c=5)=2
```
函数foo的参数y的默认值是一个匿名函数。函数foo调用时，它的参数x的值为undefined，所以y函数内部的x一开始是undefined，后来被重新赋值2。但是，函数foo内部重新声明了一个x，值为3，这两个x是不一样的，互相不产生影响，因此最后输出3。
如果将var x = 3的var去除，两个x就是一样的，最后输出的就是2。
```powershell
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
```
# 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```powershell
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```
# rest参数
...变量名
```powershell
let [a,...b] = [1,2,3,4,5];
a//1
b//[2,3,4,5];
```
ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
```powershell
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
下面是一个rest参数代替arguments变量的例子。
```powershell
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
```powershell
// 报错
function f(a, ...b, c) {
  // ...
}
```
# name属性
```powershell
function foo() {}
foo.name // "foo"
```
# 箭头函数
ES6允许使用“箭头”（=>）定义函数。
箭头函数的四个注意点
(1) 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
(2) 不可以当做构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
(3) 不可以使用arguments对象，该对象在函数体内不存在，如果要用，可以用rest参数代替
(4) 不可以使用yield命令，因此箭头函数不能用作generator函数
```powershell
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```
# 对象的扩展
ES6允许直接写入变量和函数，作为对象的属性和方法，这样的书写更加简洁。
```powershell
var foo = 'bar';
var baz = {foo};
var // {foo:"bar"}
//等同于
var bac = {foo:foo};
```
# Object.is()
ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
```powershell
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
# Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象
```powershell
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
如果只有一个参数，Object.assign会直接返回该参数。
```powershell
var obj = {a: 1};
Object.assign(obj) === obj // true
```
#  注意点 深拷贝
Object.assign不具备 深度拷贝的。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
```powershell
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```

# 属性的遍历
ES6一共有5种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。

首先遍历所有属性名为数值的属性，按照数字排序。
其次遍历所有属性名为字符串的属性，按照生成时间排序。
最后遍历所有属性名为Symbol值的属性，按照生成时间排序。
