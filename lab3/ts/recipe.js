"use strict";
// 使用立即调用函数表达式隔离示例变量，避免和其他脚本的全局变量重名。
(() => {
    // 按从 1 开始的序号查找食谱，找不到时返回 null。
    function getRecipeById(id, list) {
        // 数组下标从 0 开始，因此序号需要减 1，并用空值合并运算符处理未找到的情况。
        return list[id - 1] ?? null;
    }
    // 筛选烹饪时间少于 30 分钟的快手菜。
    function filterQuickRecipes(list) {
        // 使用 filter() 返回符合条件的食谱数组。
        return list.filter((recipe) => recipe.time < 30);
    }
    // 创建包含早餐、午餐和晚餐共 9 道菜的示例数据。
    const recipes = [
        // 添加早餐牛奶燕麦粥。
        { name: "牛奶燕麦粥", meal: "早餐", time: 10, level: "简单", ingredients: ["牛奶", "燕麦"] },
        // 添加早餐鸡蛋三明治。
        { name: "鸡蛋三明治", meal: "早餐", time: 15, level: "简单", ingredients: ["面包", "鸡蛋", "生菜"] },
        // 添加早餐蒸玉米。
        { name: "蒸玉米", meal: "早餐", time: 20, level: "简单", ingredients: ["玉米"] },
        // 添加午餐番茄炒蛋。
        { name: "番茄炒蛋", meal: "午餐", time: 15, level: "简单", ingredients: ["番茄", "鸡蛋"] },
        // 添加午餐红烧肉。
        { name: "红烧肉", meal: "午餐", time: 60, level: "困难", ingredients: ["五花肉", "冰糖", "生姜"] },
        // 添加午餐清炒西兰花。
        { name: "清炒西兰花", meal: "午餐", time: 12, level: "简单", ingredients: ["西兰花", "大蒜"] },
        // 添加晚餐糖醋里脊。
        { name: "糖醋里脊", meal: "晚餐", time: 30, level: "中等", ingredients: ["猪里脊", "醋", "番茄酱"] },
        // 添加晚餐清蒸鲈鱼。
        { name: "清蒸鲈鱼", meal: "晚餐", time: 40, level: "中等", ingredients: ["鲈鱼", "生姜", "葱"] },
        // 添加晚餐凉拌黄瓜。
        { name: "凉拌黄瓜", meal: "晚餐", time: 5, level: "简单", ingredients: ["黄瓜", "大蒜"] }
    ];
    // 使用序号查找第一道食谱，并展示查找结果。
    const firstRecipe = getRecipeById(1, recipes);
    // 输出第一道菜的名称；空值检查可避免访问 null 的属性。
    console.log("序号 1 的食谱：", firstRecipe?.name ?? "未找到");
    // 使用快手菜筛选函数获取烹饪时间少于 30 分钟的食谱。
    const quickRecipes = filterQuickRecipes(recipes);
    // 输出所有快手菜的名称。
    console.log("快手菜名：", quickRecipes.map((recipe) => recipe.name));
})();
// TypeScript 代码需要使用 tsc 编译，浏览器运行的是编译生成的 JavaScript 文件。
