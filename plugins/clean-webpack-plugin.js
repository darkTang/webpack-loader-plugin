class CleanWebpackPlugin {
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    // 1. 注册钩子，在打包输出前 emit
    compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
      this.removeFiles(fs, outputPath);
    });
    // 2. 获取打包输出目录
  }
  // 3. 通过fs删除打包输出的目录
  removeFiles(fs, outputPath) {
    fs.rmSync(outputPath, { recursive: true });
  }
}

module.exports = CleanWebpackPlugin;
