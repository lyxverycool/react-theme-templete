##  运用技术栈

`react v16.8 + webpack v4.x+ typescript + babel v7 + antd`

### 插件

`webpack-theme-color-replacer`
`react-color`
`@ant-design/colors`

### 环境目录

`env`

### 安装

`npm install`

### 运行(开发模式)

`npm run start || npm run dev`  

`env==development react-hot-loader热更新`

### 构建

`npm run build` 

`env==production 打包在dist 目录下`

### 换肤原理

1.使用webpack-theme-color-replacer在emit阶段对所有的css进行处理，
提取出所有用于换肤颜色的选择器到一个theme.css中。同时生成一个全局的变量
变量中有两个参数，一个是颜色数组，一个是生成的css路径

2.换肤时，如果是第一次则请求已生成的theme.css,读取该css,同时传入需要修改的对应颜色数组,
读取全局变量中需要更换的颜色数组，全局匹配替换掉theme.css中所有选择器的初始颜色色值，
最好以body的style内联样式插入html中这样内联样式的优先级大于link css，样式覆盖。达到换肤的效果，
非首次替换则直接更换内联样式中的所有选择器颜色，无需再次请求theme.css。

3.第一次运行时没有build theme.css，可以先npm run build之后生产dist目录再执行npm run start



