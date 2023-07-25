module.exports = function (content) {
  console.log("content");
  return content;
};

module.exports.pitch = function () {
  console.log("pitch");
  return "pitch loader";
};

/**
 * pitching loader 一旦return，就会触发熔断机制，提前结束其他loader的执行，直接回到上一组normal loader执行
 * 
 * normal loader：    nl1   nl2   nl3
 * pitching loader：  pl1   pl2   pl3
 * 正常执行：pl1 -> pl2 -> pl3 -> nl3 -> nl2 -> nl1
 * 一旦pl2 return，则：（理解：看成组的形式）
 * pl1 -> pl2 -> nl1
 */
