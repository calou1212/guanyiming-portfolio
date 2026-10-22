/**
 * JavaScript 核心语法演示
 * 1. let 与 const 的区别
 * 2. 六种函数定义方式
 * 3. this 关键字在不同调用方式下的指向
 *
 * 运行方式：node js-demo.js
 */

// 用于分隔每个演示板块的辅助函数
function section(title) {
  console.log('\n========================================');
  console.log(`  ${title}`);
  console.log('========================================');
}

/* ============================================================
 * 一、let 与 const 声明变量的区别
 * ========================================================== */
section('一、let 与 const 的区别');

// ---------- 1. 块级作用域 ----------
// let / const 都是块级作用域，只在 {} 内有效；var 是函数作用域
{
  let blockLet = '我在块内';
  const blockConst = '我也在块内';
  console.log('块内部访问 let:', blockLet);
  console.log('块内部访问 const:', blockConst);
}
// console.log(blockLet);   // ReferenceError: blockLet is not defined
// console.log(blockConst); // ReferenceError: blockConst is not defined
console.log('块外部访问：已超出作用域（上面两行若取消注释会报错）');

// ---------- 2. 能否重新赋值 ----------
let count = 1;
count = 2; // let 声明的变量可以被重新赋值
console.log('let 重新赋值后 count =', count);

const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable.
console.log('const 常量 PI =', PI, '（重新赋值会抛 TypeError）');

// ---------- 3. 能否重复声明 ----------
// let a = 1; let a = 2;    // SyntaxError: Identifier 'a' has already been declared
// const b = 1; const b = 2; // 同样报 SyntaxError
console.log('同一作用域下，let / const 都不允许重复声明（var 可以）');

// ---------- 4. 声明前访问（暂时性死区 TDZ） ----------
// console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = '已初始化';
console.log('let/const 存在暂时性死区，声明前访问会报错，初始化后 tdzVar =', tdzVar);

// ---------- 5. const 声明对象：地址不可变，内容可变 ----------
const user = { name: '张三', age: 18 };
user.age = 20;        // 修改属性是允许的
user.gender = '男';   // 新增属性也允许
// user = { name: '李四' }; // TypeError: Assignment to constant variable.
console.log('const 对象内容可变：', user);

const arr = [1, 2, 3];
arr.push(4);          // 数组内容可变
console.log('const 数组内容可变：', arr);

// ---------- 6. const 必须初始化 ----------
// let x;        // 合法，x === undefined
// const y;      // SyntaxError: Missing initializer in const declaration
let x;
console.log('let 可以先声明后赋值：x =', x);
console.log('const 必须在声明时初始化，否则 SyntaxError');

// ---------- 7. 循环中的经典对比 ----------
console.log('\n--- 循环中的表现 ---');
// 同步对比：var 只有函数作用域，块外仍可见；let 每次循环生成独立绑定
for (var i = 0; i < 3; i++) { /* 空循环体 */ }
for (let k = 0; k < 3; k++) { /* 空循环体 */ }
console.log('循环结束后 var i 仍可访问：i =', i);
// console.log(k); // ReferenceError: k is not defined（let 块级作用域）

// 异步对比（注意：setTimeout 是异步的，这 6 行输出会出现在脚本最末尾）
console.log('异步对比（var 全部输出 3，let 输出 0/1/2），结果见脚本末尾：');
for (var m = 0; m < 3; m++) {
  setTimeout(() => console.log('  [异步] var m =', m), 0); // 全部输出 3
}
for (let n = 0; n < 3; n++) {
  setTimeout(() => console.log('  [异步] let n =', n), 0); // 输出 0 1 2
}

/* ============================================================
 * 二、六种函数定义方式
 * ========================================================== */
section('二、六种函数定义方式');

// ---------- 方式 1：函数声明（Function Declaration） ----------
// 特点：存在函数提升，可以在定义之前调用
console.log('\n【1】函数声明 —— 提升前调用结果：', add(2, 3));
function add(a, b) {
  return a + b;
}
console.log('    函数声明 add(2, 3) =', add(2, 3));

// ---------- 方式 2：函数表达式（Function Expression） ----------
// 特点：把匿名函数赋值给变量，不会整体提升（变量提升但值为 undefined）
// console.log(sub(5, 2)); // TypeError: sub is not a function（若用 var 声明则是这个错）
const sub = function (a, b) {
  return a - b;
};
console.log('\n【2】函数表达式 sub(5, 2) =', sub(5, 2));

// 具名函数表达式：名字只在函数内部可见，便于递归与调试
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
console.log('    具名函数表达式 factorial(5) =', factorial(5));

// ---------- 方式 3：箭头函数（Arrow Function） ----------
// 特点：语法简洁；没有自己的 this / arguments；不能作为构造函数
const multiply = (a, b) => a * b;                 // 省略 return 的简洁写法
const square = n => n * n;                        // 单个参数可省略括号
const greet = () => 'Hello Arrow Function';       // 无参数
const sumAll = (...nums) => nums.reduce((s, n) => s + n, 0); // 剩余参数
console.log('\n【3】箭头函数 multiply(3, 4) =', multiply(3, 4));
console.log('    单参箭头 square(6) =', square(6));
console.log('    无参箭头 greet() =', greet());
console.log('    剩余参数 sumAll(1,2,3,4) =', sumAll(1, 2, 3, 4));

// ---------- 方式 4：立即执行函数表达式 IIFE ----------
// 特点：定义后立即执行，创建独立作用域，避免污染全局变量（ES6 前常用模块模式）
console.log('\n【4】IIFE 立即执行：');
(function () {
  const privateVar = '我是 IIFE 内部变量，外部访问不到';
  console.log('    ' + privateVar);
})();

// 带参数并接收返回值的 IIFE
const iifeResult = (function (name) {
  return `你好，${name}！这是 IIFE 的返回值`;
})('小明');
console.log('    ' + iifeResult);

// 箭头函数版 IIFE
((a, b) => console.log('    箭头 IIFE 求和：', a + b))(10, 20);

// ---------- 方式 5：对象方法（Method） ----------
// 特点：作为对象的属性存在，普通方法中的 this 指向调用它的对象
const calculator = {
  name: '计算器',
  // 传统写法
  add: function (a, b) {
    return a + b;
  },
  // ES6 简写语法（推荐）
  subtract(a, b) {
    return a - b;
  },
  // 简写方法中的 this 指向该对象自身
  getName() {
    return this.name;
  },
  // 注意：箭头函数写法会继承外层 this，这里外层是模块作用域，拿不到 name
  getWrongName: () => this.name
};
console.log('\n【5】对象方法：');
console.log('    calculator.add(7, 8) =', calculator.add(7, 8));
console.log('    calculator.subtract(9, 4) =', calculator.subtract(9, 4));
console.log('    calculator.getName() =', calculator.getName());

// ---------- 方式 6：构造函数（Constructor Function） ----------
// 特点：首字母大写约定；必须用 new 调用；this 指向新创建的实例
function Person(name, age) {
  this.name = name;   // this 指向 new 出来的实例对象
  this.age = age;
  this.sayHi = function () {
    return `我是 ${this.name}，今年 ${this.age} 岁`;
  };
}
// 方法共享：挂在原型上更省内存
Person.prototype.introduce = function () {
  return `【原型方法】姓名：${this.name}，年龄：${this.age}`;
};

const p1 = new Person('李四', 25);
const p2 = new Person('王五', 30);
console.log('\n【6】构造函数：');
console.log('    p1 =', p1);
console.log('    p1.sayHi() =', p1.sayHi());
console.log('    p2.introduce() =', p2.introduce());
console.log('    p1 是 Person 的实例吗：', p1 instanceof Person);
console.log('    两个实例的方法是否共享：', p1.introduce === p2.introduce);

// 不用 new 调用的后果（非严格模式下 this 指向全局对象，会污染全局）
// const bad = Person('无名', 0); // undefined，且属性挂到全局

/* ============================================================
 * 三、this 关键字在不同调用方式下的指向
 * ========================================================== */
section('三、this 的指向');

const obj = {
  name: '对象obj',
  // 普通方法：this 指向调用者 obj
  showThis() {
    console.log('  this === obj ?', this === obj, '| this.name =', this.name);
  },
  // 箭头函数：没有自己的 this，继承定义时所在作用域的 this
  // 注意：此处定义时外层是"模块作用域"，Node 中模块顶层 this === module.exports（浏览器中是 window）
  arrowShowThis: () => {
    console.log('  箭头函数中的 this（继承外层模块作用域，拿不到 obj）:', this);
  },
  // 嵌套普通函数：内层函数丢失 this
  nestedNormal() {
    console.log('  外层 this.name =', this.name);
    function inner() {
      console.log('  内层普通函数 this =', this === globalThis ? 'globalThis（非严格模式）' : this);
    }
    inner();
  },
  // 嵌套箭头函数：继承外层方法的 this
  nestedArrow() {
    const inner = () => {
      console.log('  内层箭头函数 this.name =', this.name);
    };
    inner();
  },
  // 计时器场景对比
  timerNormal() {
    setTimeout(function () {
      console.log('  setTimeout 普通函数 this.name =', this && this.name);
    }, 0);
  },
  timerArrow() {
    setTimeout(() => {
      console.log('  setTimeout 箭头函数 this.name =', this.name);
    }, 0);
  }
};

// ---------- 场景 1：作为对象方法调用 ----------
console.log('\n场景1：对象方法调用（obj.showThis()）');
obj.showThis(); // this === obj

// ---------- 场景 2：普通函数直接调用 ----------
console.log('\n场景2：普通函数直接调用');
function standalone() {
  console.log('  this === globalThis ?', this === globalThis);
}
standalone(); // 非严格模式下 this 指向全局对象；严格模式（'use strict'）下为 undefined

function strictFn() {
  'use strict';
  console.log('  严格模式下 this =', this);
}
strictFn(); // undefined

// ---------- 场景 3：构造函数调用（new） ----------
console.log('\n场景3：构造函数调用（new）');
function Animal(type) {
  this.type = type;
  console.log('  构造函数内 this 是新实例吗：', this instanceof Animal, '| this.type =', this.type);
}
const cat = new Animal('猫');
console.log('  cat.type =', cat.type);

// ---------- 场景 4：箭头函数 ----------
console.log('\n场景4：箭头函数中的 this（继承定义时的外层作用域）');
obj.arrowShowThis();
obj.nestedArrow(); // 箭头函数解决了内层函数 this 丢失问题

console.log('\n  嵌套普通函数（this 丢失）：');
obj.nestedNormal();

console.log('\n  定时器对比（异步，输出见下方稍后位置）：');
obj.timerNormal(); // 普通函数：this 不指向 obj
obj.timerArrow();  // 箭头函数：this 指向 obj

// ---------- 场景 5：call / apply / bind 显式绑定 ----------
console.log('\n场景5：call / apply / bind 显式指定 this');
function introduce(city, job) {
  console.log(`  ${this.name} 来自${city}，职业是${job}`);
}
const personA = { name: '赵六' };
const personB = { name: '孙七' };

introduce.call(personA, '北京', '工程师');    // 参数逐个传
introduce.apply(personB, ['上海', '设计师']); // 参数以数组传

const boundFn = introduce.bind(personA, '广州'); // 预设 this 与部分参数（柯里化）
boundFn('教师');

// ---------- 场景 6：this 丢失与修复 ----------
console.log('\n场景6：方法被赋值给变量后 this 丢失');
const extracted = obj.showThis;
// extracted(); // 此时 this 不再指向 obj（非严格模式为 globalThis，this.name 为 undefined）
console.log('  直接调用 extracted 时 this 指向已改变，修复方式：');
extracted.call(obj); // 用 call 把 this 重新绑定回 obj

// ---------- 场景 7：事件/回调中的 this ----------
console.log('\n场景7：DOM 事件中的 this（浏览器环境）');
console.log('  普通函数作为事件处理函数时，this 指向触发事件的元素；');
console.log('  箭头函数作为事件处理函数时，this 继承外层作用域，拿不到该元素。');

/* ============================================================
 * 小结
 * ========================================================== */
section('总结');
console.log(`
1. let vs const
   - 相同：块级作用域、不能重复声明、存在暂时性死区、不会挂到 window/global
   - 不同：let 可重新赋值、可先声明后赋值；const 必须初始化且不能改绑定
   - const 保证的是"引用地址"不变，对象/数组的内容仍可修改

2. 六种函数定义
   - 函数声明：有提升，可先调用后定义
   - 函数表达式：赋值给变量，无提升（变量提升但值为 undefined）
   - 箭头函数：简洁、无自己的 this/arguments、不能 new
   - IIFE：定义即执行，隔离作用域
   - 对象方法：作为对象属性，this 指向调用它的对象
   - 构造函数：配合 new 使用，this 指向新实例，方法建议挂 prototype

3. this 指向速记
   - 普通函数：谁调用指向谁（默认绑定为全局/严格模式 undefined）
   - 箭头函数：没有自己的 this，继承定义时外层作用域的 this
   - new 调用：指向新创建的实例
   - call/apply/bind：指向显式传入的第一个参数
   - 优先级：new > 显式绑定(bind/apply/call) > 隐式绑定(对象调用) > 默认绑定
`);
