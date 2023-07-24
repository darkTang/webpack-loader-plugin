const loaderUtils = require("loader-utils");

module.exports = function (content) {
  // 1. 根据文件内容生成带hash值文件名
  let interpolatedName = loaderUtils.interpolateName(
    this,
    "[hash].[ext][query]",
    {
      content,
    }
  );
  interpolatedName = `images/${interpolatedName}`
  console.log(interpolatedName);
  // 2. 将文件输出出去
  this.emitFile(interpolatedName, content);
  // 3. 返回：module.exports= "文件路径（文件名）"
  return `module.exports= "${interpolatedName}"`;
};

// 处理图片、字体的等文件。需要用raw loader处理
module.exports.raw = true;
