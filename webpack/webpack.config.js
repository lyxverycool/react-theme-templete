const { webpackConfig } = require('lyxcool-webpack')
const { generate } = require('@ant-design/colors')
const ThemeColorReplacer = require('webpack-theme-color-replacer')

//改变less_var

const modifyVars = {
  "@primary-color": "#68c69c",
  "@bg-color": "#f8f8f8",
  "@text-color": "#666666",
  "@text-deep-color": "#333333",
  "@red-color": "#e54d4d",
  "@blue-color": "#4a8af6"
}

webpackConfig.module.rules[2].use[3].options.modifyVars = modifyVars

//更换颜色
let newColors = ['#68c69c', '#f8f8f8', '#666666', '#333333', "#e54d4d", "#4a8af6"]
const primary_colors = generate(newColors[0])
newColors = newColors.concat(primary_colors)

webpackConfig.plugins.push(
  new ThemeColorReplacer({
    matchColors: newColors,
    fileName: 'css/theme-colors-[contenthash:8].css',
    injectCss: false,
    isJsUgly: true,
  })
)

webpackConfig.optimization = {
  runtimeChunk: {
    name: entrypoint => 'manifest.' + entrypoint.name,
  }
}

module.exports = webpackConfig