module.exports = function (content) {
  /*
    1. 直接使用style-loadera，只能处理样式，不能处理样式中引入的其他资源
    2. 借助css-laoder，解决样式中引入的其他资源问题
    3. 问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上，不好操作
  */

  // const script = `
  //   const styleEl = document.createElement('style');
  //   styleEl.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEl);
  // `
  // return script
};

module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩下还需要处理的loader（当前的style-loader的不算） ! 分隔符，左边为待处理的loader，右边的是当前处理的css文件的绝对路径
  // /Users/darktang/Desktop/review/webpack-loader-plugin/node_modules/css-loader/dist/cjs.js!/Users/darktang/Desktop/review/webpack-loader-plugin/src/css/index.css

  // 1. 将 remainingRequest 中的绝对路径改成相对路径（因为后面只能使用相对路径操作）
  let relativePath = remainingRequest
    .split("!")
    .map((absolutePath) => {
      return this.utils.contextify(this.context, absolutePath);
    })
    .join("!");
  // ../../node_modules/css-loader/dist/cjs.js!./index.css
  console.log(relativePath);
  const script = `
  import style from "!!${relativePath}"
  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
`;
  return script;
};

/**
 * 1. 直接使用style-loader，只能处理样式，不能处理样式中引入的其他资源
 * use: ["./loaders/custom-loader/style-loader"]
 *
 * 2. 借助css-loader解决样式中引入的其他资源问题
 * use: ["./loaders/custom-loader/style-loader", "css-loader"]
 * 问题：css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上，不好操作
 *
 * 3. style-loader使用pitch loader用法
 */
