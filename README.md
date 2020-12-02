# toutiao-m
# VueCLi 组件
npm install --global @vue/cli
# 安装 Vant
npm i vant

# 使用 lib-flexible 动态设置 REM 基准值（html 标签的字体大小）
npm i amfe-flexible
npm install postcss-pxtorem -D
# 关于 PostCSS 配置文件
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

# 登录注册

