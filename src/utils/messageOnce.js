import { ElMessage } from "element-plus";

// 私有属性，只在当前文件可用
const showMessage = Symbol("showMessage");
export default class messageOnce {
  success(options, single = true) {
    // Message方法
    this[showMessage]("success", options, single);
  }
  warning(options, single = true) {
    this[showMessage]("warning", options, single);
  }
  info(options, single = true) {
    this[showMessage]("info", options, single);
  }
  error(options, single = true) {
    this[showMessage]("error", options, single);
  }

  alert(options, single = true) {
    this[showMessage]("error", options, single);
  }
  [showMessage](type, options, single) {
    if (single) {
      // 关键代码，判断当前页是否有el-message标签，如果没有则执行弹窗操作
      if (
        document.getElementsByClassName("el-message-box").length === 0 ||
        document.getElementsByClassName("el-message-box__wrapper")[0].style
          .display == "none"
      ) {
        ElMessage(options);
      }
    } else {
      ElMessage(options);
    }
  }
}
