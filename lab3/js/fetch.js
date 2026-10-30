// 回调函数可以处理异步结果，但多层嵌套时容易形成“回调地狱”。
// Promise 用 .then() 链式处理异步步骤；async/await 是基于 Promise 的简洁写法。
// 等待 HTML 文档解析完成后再查找列表并自动发起请求。
document.addEventListener("DOMContentLoaded", () => {
  // 获取用于显示用户数据的列表。
  const fetchList = document.getElementById("fetchList");

  // 如果页面没有目标列表，就明确报告配置问题并停止后续操作。
  if (!fetchList) {
    console.error('找不到用于显示数据的列表：#fetchList');
    return;
  }

  // 创建用于显示加载状态和错误信息的提示区域。
  const statusMessage = document.createElement("p");
  // 设置提示区域的无障碍状态播报方式。
  statusMessage.setAttribute("aria-live", "polite");
  // 将提示区域放在数据列表之前。
  fetchList.parentNode.insertBefore(statusMessage, fetchList);

  // 创建加载提示元素。
  const loadingMessage = document.createElement("span");
  // 设置加载提示文字。
  loadingMessage.textContent = "加载中...";
  // 将加载提示添加到状态区域。
  statusMessage.appendChild(loadingMessage);

  // 创建错误提示元素。
  const errorMessage = document.createElement("span");
  // 将错误提示添加到状态区域。
  statusMessage.appendChild(errorMessage);

  // 请求用户数据并使用 async/await 处理结果。
  const loadUsers = async () => {
    // 显示加载提示并清除上一次错误信息。
    loadingMessage.hidden = false;
    errorMessage.textContent = "";

    try {
      // 使用 Fetch API 请求用户接口。
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      // 检查 HTTP 状态码，非 2xx 响应作为错误处理。
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`.trim());
      }

      // 将响应正文解析为 JSON 用户数组。
      const users = await resp.json();
      // 确认响应数据是数组，避免错误数据导致渲染异常。
      if (!Array.isArray(users)) {
        throw new Error("接口返回的数据格式不正确");
      }

      // 创建文档片段以便一次性添加所有列表项。
      const listItems = document.createDocumentFragment();
      // 按顺序为每位用户创建列表项。
      users.forEach((user, index) => {
        // 创建当前用户对应的列表项。
        const listItem = document.createElement("li");
        // 使用 textContent 安全地显示序号和用户名。
        listItem.textContent = `${index + 1}. ${user.name}`;
        // 将列表项添加到文档片段。
        listItems.appendChild(listItem);
      });

      // 清除旧列表内容。
      fetchList.replaceChildren();
      // 将本次请求得到的用户列表添加到页面。
      fetchList.appendChild(listItems);
    } catch (error) {
      // 取得错误说明并显示失败提示。
      const reason = error instanceof Error ? error.message : String(error);
      errorMessage.textContent = `加载失败：${reason}`;
      // 在控制台保留错误详情，方便调试网络或接口问题。
      console.error("获取用户数据失败：", error);
    } finally {
      // 无论请求成功或失败，都隐藏加载提示。
      loadingMessage.hidden = true;
    }
  };

  // 使用 .then() 链式写法请求同一接口，作为 async/await 的对比版本。
  const compareWithThen = () => {
    // 发起对比请求，网络失败会由末尾的 .catch() 处理。
    fetch("https://jsonplaceholder.typicode.com/users")
      // 检查 HTTP 状态并返回响应，以便后续解析 JSON。
      .then((resp) => {
        // 非 2xx 响应转为 Promise 拒绝状态。
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status} ${resp.statusText}`.trim());
        }
        // 将响应传递给下一个 .then()。
        return resp;
      })
      // 解析响应正文，并检查返回数据格式。
      .then((resp) => resp.json())
      // 验证并输出对比请求拿到的数据。
      .then((users) => {
        // 非数组数据不符合接口预期，交由 .catch() 处理。
        if (!Array.isArray(users)) {
          throw new Error("接口返回的数据格式不正确");
        }
        // 输出对比请求的数据，便于验证其与主请求结果一致。
        console.log("Promise .then() 对比版本获取的用户数据：", users);
      })
      // 处理对比请求中的 HTTP、网络或 JSON 解析错误。
      .catch((error) => {
        // 输出对比请求的错误详情，不影响主请求的页面提示。
        console.error("Promise .then() 对比请求失败：", error);
      });
  };

  // 页面加载完成后自动启动主请求。
  loadUsers();
  // 页面加载完成后也自动启动 .then() 对比请求。
  compareWithThen();
});