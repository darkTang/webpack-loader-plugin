module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    console.log("async loader");
    callback(null, content, map, meta);
  }, 1000);
};

/**
 * 异步操作必须要写到异步loader里，写到同步loader会报错
 */
