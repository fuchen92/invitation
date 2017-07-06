# invitation

一个简单的招聘网站页面，目的在于学习实验gulp的使用

**说明：**请尽可能使用高版本浏览器查看，推荐使用Chrome，Firefox，Edge 或其他浏览器升级至最高版本浏览。

<h3>目录结构</h3>

```
    invite
        dist                    // 输出文件夹
            css                 // 存放压缩合并后的输出的css文件
            img                 // 存放压缩后输出的图片
            js                  // 存放压缩丑化后输出的js文件

        src                     // 源文件
            css                 // css源文件
            img                 // 图片源文件
            js                  // js源文件

        .gitignore
        gulpfile.js             // gulp入口文件
        package.json
        README.md
```

### 进入项目目录执行以下命令

---

安装依赖模块

```
    npm install
```

启动服务

```
    gulp
```

*如果想要不执行上述命令直接双击看到效果需要自行修改`css`，`js`，`img`资源的引用路径，目的在于学习试验gulp的使用*
