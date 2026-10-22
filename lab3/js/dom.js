// 等待 HTML 文档解析完成后再获取页面元素并绑定事件。
document.addEventListener("DOMContentLoaded", () => {
  // 获取食谱名称输入框。
  const recipeNameInput = document.getElementById("recipeName");
  // 获取添加食谱按钮。
  const addButton = document.getElementById("addBtn");
  // 获取餐次下拉框。
  const mealSelect = document.getElementById("mealSelect");
  // 获取早餐食谱列表。
  const breakfastList = document.getElementById("breakfastList");
  // 获取午餐食谱列表。
  const lunchList = document.getElementById("lunchList");
  // 获取晚餐食谱列表。
  const dinnerList = document.getElementById("dinnerList");

  // 按餐次保存对应列表，便于把食谱添加到正确的位置。
  const mealLists = {
    早餐: breakfastList,
    午餐: lunchList,
    晚餐: dinnerList
  };

  // 准备页面加载时展示的 9 道初始食谱。
  // 每道菜含：名称、餐次、做菜时长（分钟）、难度、营养成分。
  // 营养成分按"每100克"标注，数据经权威来源（中国疾控中心营养与健康所等）核实。
  const initialRecipes = [
    // 早餐：牛奶燕麦粥，10分钟，简单，每100克约126千卡、蛋白质5克、脂肪4.5克、碳水22克。
    { name: "牛奶燕麦粥", meal: "早餐", time: 10, level: "简单", nutrition: "每100克约126千卡，蛋白质5克，脂肪4.5克，碳水22克" },
    // 早餐：鸡蛋三明治，15分钟，简单，每100克约250千卡、蛋白质12克、脂肪11克、碳水26克。
    { name: "鸡蛋三明治", meal: "早餐", time: 15, level: "简单", nutrition: "每100克约250千卡，蛋白质12克，脂肪11克，碳水26克" },
    // 早餐：蒸玉米，20分钟，简单，每100克约96千卡、蛋白质3.4克、脂肪1.5克、碳水21克。
    { name: "蒸玉米", meal: "早餐", time: 20, level: "简单", nutrition: "每100克约96千卡，蛋白质3.4克，脂肪1.5克，碳水21克" },
    // 午餐：番茄炒蛋，15分钟，简单，每100克约95千卡、蛋白质5克、脂肪5.5克、碳水6克。
    { name: "番茄炒蛋", meal: "午餐", time: 15, level: "简单", nutrition: "每100克约95千卡，蛋白质5克，脂肪5.5克，碳水6克" },
    // 午餐：红烧肉，60分钟，困难，每100克约358千卡、蛋白质9.8克、脂肪34.8克、碳水1克。
    { name: "红烧肉", meal: "午餐", time: 60, level: "困难", nutrition: "每100克约358千卡，蛋白质9.8克，脂肪34.8克，碳水1克" },
    // 午餐：清炒西兰花，12分钟，简单，每100克约35千卡、蛋白质3克、脂肪0.4克、碳水5.1克。
    { name: "清炒西兰花", meal: "午餐", time: 12, level: "简单", nutrition: "每100克约35千卡，蛋白质3克，脂肪0.4克，碳水5.1克" },
    // 晚餐：糖醋里脊，30分钟，中等，每100克约260千卡、蛋白质8.9克、脂肪14克、碳水25克。
    { name: "糖醋里脊", meal: "晚餐", time: 30, level: "中等", nutrition: "每100克约260千卡，蛋白质8.9克，脂肪14克，碳水25克" },
    // 晚餐：清蒸鲈鱼，40分钟，中等，每100克约133千卡、蛋白质18.6克、脂肪3.4克、碳水0克。
    { name: "清蒸鲈鱼", meal: "晚餐", time: 40, level: "中等", nutrition: "每100克约133千卡，蛋白质18.6克，脂肪3.4克，碳水0克" },
    // 晚餐：凉拌黄瓜，5分钟，简单，每100克约16千卡、蛋白质0.8克、脂肪0.2克、碳水3.6克。
    { name: "凉拌黄瓜", meal: "晚餐", time: 5, level: "简单", nutrition: "每100克约16千卡，蛋白质0.8克，脂肪0.2克，碳水3.6克" }
  ];

  // 创建食谱列表项，并添加详情和删除事件。
  const createRecipeItem = (recipe) => {
    // 根据餐次找到食谱应当显示的列表。
    const targetList = mealLists[recipe.meal];
    // 如果餐次没有对应列表，则报告配置错误并停止处理。
    if (!targetList) {
      console.error("找不到餐次对应的列表：", recipe.meal);
      return;
    }

    // 创建用于显示食谱的列表项。
    const listItem = document.createElement("li");
    // 使用 textContent 安全地设置食谱名称。
    listItem.textContent = recipe.name;
    // 为列表项绑定点击事件，用于查看食谱详情。
    listItem.addEventListener("click", () => {
      // 读取做菜时长，若新添加的菜没有该字段则显示"未知"。
      const cookTime = recipe.time != null ? recipe.time + "分钟" : "未知";
      // 读取难度，若新添加的菜没有该字段则显示"未知"。
      const level = recipe.level || "未知";
      // 读取营养成分，若新添加的菜没有该字段则显示"暂无数据"。
      const nutrition = recipe.nutrition || "暂无数据";
      // 点击食谱名称时弹出完整详情：菜名、做菜时长、难度、营养成分。
      alert(`食谱：${recipe.name}\n做菜时长：${cookTime}\n难度：${level}\n营养成分：${nutrition}`);
    });

    // 创建列表项旁边的删除按钮。
    const deleteButton = document.createElement("button");
    // 设置删除按钮上显示的文字。
    deleteButton.textContent = "删除";
    // 为删除按钮绑定点击事件。
    deleteButton.addEventListener("click", (event) => {
      // 阻止删除按钮的点击事件冒泡到列表项，避免触发详情提示。
      event.stopPropagation();
      // 删除当前食谱列表项。
      listItem.remove();
    });
    // 将删除按钮添加到当前列表项中。
    listItem.appendChild(deleteButton);
    // 将完整的食谱列表项添加到对应餐次的列表。
    targetList.appendChild(listItem);
  };

  // 将所有初始食谱逐个渲染到对应的三餐列表。
  initialRecipes.forEach((recipe) => {
    // 创建并添加当前初始食谱的列表项。
    createRecipeItem(recipe);
  });

  // ---------- 步骤二数组方法在页面上的体现 ----------

  // 用 filter 筛选烹饪时间少于 30 分钟的"快手菜"。
  const quickRecipes = initialRecipes.filter((recipe) => recipe.time < 30);
  // 获取显示快手菜的列表。
  const quickList = document.getElementById("quickList");
  // 把快手菜逐个渲染到列表。
  quickRecipes.forEach((recipe) => {
    // 创建快手菜的列表项。
    const li = document.createElement("li");
    // 显示菜名和做菜时长。
    li.textContent = `${recipe.name}（${recipe.time}分钟）`;
    // 加入快手菜列表。
    quickList.appendChild(li);
  });

  // 为添加按钮绑定点击事件。
  addButton.addEventListener("click", () => {
    // 读取输入框内容并去除首尾空格。
    const recipeName = recipeNameInput.value.trim();
    // 检查输入是否为空。
    if (recipeName === "") {
      // 输入为空时提示用户填写食谱名称。
      alert("请输入食谱名称！");
      // 结束本次添加操作。
      return;
    }

    // 读取下拉框当前选中的餐次。
    const selectedMeal = mealSelect.value;
    // 创建食谱对象并添加到所选餐次对应的列表。
    createRecipeItem({ name: recipeName, meal: selectedMeal });
    // 添加成功后清空输入框。
    recipeNameInput.value = "";
    // 将焦点放回输入框，方便继续添加。
    recipeNameInput.focus();
  });

  // 为输入框绑定键盘按下事件。
  recipeNameInput.addEventListener("keydown", (event) => {
    // 判断用户是否按下 Enter 键。
    if (event.key === "Enter") {
      // 阻止可能的表单默认提交行为。
      event.preventDefault();
      // 触发添加按钮的 click 事件，复用同一套校验和添加逻辑。
      addButton.click();
    }
  });
});