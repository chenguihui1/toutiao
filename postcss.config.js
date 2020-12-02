/**
 * postcss 的配置文件
 * postcss 是运行在node.js中
 */

// 配置文件需要导出一个对象
module.exports = {
  plugins: {
    // 自动添加浏览器厂商说明前缀
    // VueCLI 已经在内部默认配置了autoprefixer
    autoprefixer: {
    //   // browsers 用来配置要兼容到系统（浏览器）环境
    //   // 这个配置没有问题，但是写到这里会有控制台编译警告
    //   /**
    //    * 为什么? 因为VueCLI 是通过项目中的
    //    * .browserlistrc 文件来配置要兼容的环境信息的
    //    */
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 把 px 转为 rem
    'postcss-pxtorem': {
    // 正常情况下安照你的设计稿来
    // 750 宽的设计稿，750 / 10 = 75
    // 375 宽的设计搞，375 / 10 = 37.5
    // Vant 组件库是基于 375 宽写的
    // 移动端页面一般是一 iphone 6/7/8 为原型设计的
    // Vant 组件库是基于逻辑像素 375 写的
    // 设计稿都是基于物理像素 750 宽设计的
    // 如果设置成 75，那么我们就可以在设计搞中测量多少就写多少，
    // 但是Vant 的样式会变得很小，小了一半
      rootValue: 37.5,

      // 需要转换的 css 属性
      propList: ['*']
    }
  }
}
