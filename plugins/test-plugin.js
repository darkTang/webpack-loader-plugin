class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor");
  }
  apply(compiler) {
    console.log("TestPlugin apply");
    console.log(compiler);
    // environment 是同步钩子，需要使用tap注册
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("TestPlugin environment");
    });

    // emit 是异步串行钩子 AsyncSeriesHook，可以使用tap注册，但是无法做异步操作
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log(compilation);
      console.log("TestPlugin emit 111");
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin emit 222");
        callback(); // callback执行完才会继续向下执行
      }, 2000);
    });

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("TestPlugin emit 333");
         resolve()
        }, 2000);
      });
    });

    // make 是异步并行钩子 AsyncParallelHook
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log("TestPlugin seal");
      })
      setTimeout(() => {
        console.log("TestPlugin make 111");
        callback()
      }, 3000);
    })

    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make 222");
        callback()
      }, 3000);
    })

    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make 333");
        callback()
      }, 3000);
    })
  }
}

module.exports = TestPlugin;

/**
 * 1. webpack会加载webpack.config.js中所有配置，此时就会new TestPlugin()，执行插件的constructor
 * 2. webpack创建compiler
 * 3. 遍历所有plugins中插件，调用插件的apply方法
 * 4. 执行剩下的编译流程（触发各个hooks事件）
 */
