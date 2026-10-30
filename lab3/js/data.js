// 使用数组字面量创建包含 9 个食谱对象的 recipes 数组。
const recipes = [
  // 添加早餐牛奶燕麦粥：烹饪 10 分钟，难度简单。
  { name: "牛奶燕麦粥", meal: "早餐", time: 10, level: "简单", ingredients: ["牛奶", "燕麦"] },
  // 添加早餐鸡蛋三明治：烹饪 15 分钟，难度简单。
  { name: "鸡蛋三明治", meal: "早餐", time: 15, level: "简单", ingredients: ["面包", "鸡蛋", "生菜"] },
  // 添加早餐蒸玉米：烹饪 20 分钟，难度简单。
  { name: "蒸玉米", meal: "早餐", time: 20, level: "简单", ingredients: ["玉米"] },
  // 添加午餐番茄炒蛋：烹饪 15 分钟，难度简单。
  { name: "番茄炒蛋", meal: "午餐", time: 15, level: "简单", ingredients: ["番茄", "鸡蛋"] },
  // 添加午餐红烧肉：烹饪 60 分钟，难度困难。
  { name: "红烧肉", meal: "午餐", time: 60, level: "困难", ingredients: ["五花肉", "冰糖", "生姜"] },
  // 添加午餐清炒西兰花：烹饪 12 分钟，难度简单。
  { name: "清炒西兰花", meal: "午餐", time: 12, level: "简单", ingredients: ["西兰花", "大蒜"] },
  // 添加晚餐糖醋里脊：烹饪 30 分钟，难度中等。
  { name: "糖醋里脊", meal: "晚餐", time: 30, level: "中等", ingredients: ["猪里脊", "醋", "番茄酱"] },
  // 添加晚餐清蒸鲈鱼：烹饪 40 分钟，难度中等。
  { name: "清蒸鲈鱼", meal: "晚餐", time: 40, level: "中等", ingredients: ["鲈鱼", "生姜", "葱"] },
  // 添加晚餐凉拌黄瓜：烹饪 5 分钟，难度简单。
  { name: "凉拌黄瓜", meal: "晚餐", time: 5, level: "简单", ingredients: ["黄瓜", "大蒜"] }
];
// 输出全部食谱数据。
console.log("食谱数组：", recipes);

// 使用 new Array() 创建一个菜名数组，演示另一种数组创建方式。
const dishNames = new Array("蒸蛋", "水果沙拉", "蔬菜粥");
// 输出 new Array() 创建的菜名数组。
console.log("new Array() 菜名数组：", dishNames);

// 使用对象字面量创建食谱对象 r1。
const r1 = { name: "水果沙拉", time: 8 };
// 输出对象字面量创建的对象 r1。
console.log("对象字面量创建 r1：", r1);

// 使用 new Object() 创建食谱对象 r2。
const r2 = new Object();
// 为 r2 设置菜名。
r2.name = "蔬菜粥";
// 为 r2 设置烹饪时间。
r2.time = 18;
// 输出 new Object() 创建并赋值后的对象 r2。
console.log("new Object() 创建 r2：", r2);

// 使用 map() 提取每道菜的名称，生成新的菜名数组。
const allRecipeNames = recipes.map((recipe) => recipe.name);
// 输出 map() 提取的所有菜名。
console.log("所有菜名：", allRecipeNames);

// 使用 filter() 筛选烹饪时间少于 30 分钟的食谱。
const quickRecipes = recipes.filter((recipe) => recipe.time < 30);
// 输出 time < 30 的快手菜对象。
console.log("快手菜（少于30分钟）：", quickRecipes);

// 使用 filter() 筛选 meal 字段为“早餐”的食谱。
const breakfastRecipes = recipes.filter((recipe) => recipe.meal === "早餐");
// 输出所有早餐食谱。
console.log("早餐菜品：", breakfastRecipes);

// 使用 filter() 筛选难度为“简单”的食谱。
const easyRecipes = recipes.filter((recipe) => recipe.level === "简单");
// 输出所有简单难度的菜。
console.log("简单难度的菜：", easyRecipes);

// 使用 reduce() 累加所有食谱的烹饪时间，初始值为 0。
const totalCookingTime = recipes.reduce((total, recipe) => total + recipe.time, 0);
// 按要求输出所有食谱的总烹饪时间。
console.log("总烹饪时间：" + totalCookingTime + "分钟");

// 使用 JSON.stringify() 将食谱数组序列化，并设置 2 个空格的缩进。
const recipesJson = JSON.stringify(recipes, null, 2);
// 输出序列化后的 JSON 字符串。
console.log("JSON序列化结果：\n" + recipesJson);

// 使用 JSON.parse() 将 JSON 字符串还原为 JavaScript 数组。
const restoredRecipes = JSON.parse(recipesJson);
// 输出还原后第一道菜的名称，以证明反序列化成功。
console.log("还原后第1道菜名：" + restoredRecipes[0].name);
