// raw loader接收到的content是buffer数据 处理图片、字体图标等资源
// raw loader中既可以写同步loader也可以写异步loader

// module.exports = function (content) {
//   console.log(content);
//   return content;
// };

// module.exports.raw = true;


// 写法2
function rawLoader(content) {
  return content
}

rawLoader.raw = true

module.exports = rawLoader