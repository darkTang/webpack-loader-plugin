// 同步loader

// 方式1
// module.exports = function (content) {
//   return content;
// };

// 方式2
module.exports = function (content, map, meta) {
  /**
   * 第一个参数：可以传loader编译错误的原因 或 null（loader编译成功）
   * 第二个参数：content处理后的内容
   * 第三个参数：source-map 继续传递source-map
   * 第四个参数：meta 给下一个loadr传递参数
   */
  console.log("sync loader");
  this.callback(null, content, map, meta); // 可以继续传递给下一个loader的参数
};
