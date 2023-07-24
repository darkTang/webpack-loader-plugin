const schema = require("./schema.json");
const babel = require("@babel/core");

module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(schema);

  // 异步方法需要异步loader
  babel.transform(content, options, function (err, res) {
    if (err) callback(err);
    else callback(null, res.code)
  });
};
