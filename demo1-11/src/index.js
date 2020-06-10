require('./index.css')

// function log(data) {
//     console.log(data)
// }
// log(1111)
// file-loader 默认会在内部生成一张图片 到build 目录下
// 把生成到图片路径返回
// import logo from 'test.png' // 把图片引入，返回的结果是一个新的图片地址
// require('1.png')
// 1.相对路径: "./assets/logo_blue.png" 
// 2.没有前缀的路径 "assets/logo_blue.png" 被webpack解析为 相对路径
// 3.带~的路径  "~@/assets/theme/logo_blue.png" 被webpack解析为 require(src/assets/theme/logo_blue.png) 动态引入 
// @在webpack 被resolve.alias配置下等价于/src
// 4.相对根目录的路径 "/assets/logo_blue.png" webpack不解析
import img from './1.jpg';
let image = new Image();
image.src = img
console.log(img)
document.body.appendChild(image)
