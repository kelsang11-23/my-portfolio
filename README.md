# 欢迎使用你的秒哒应用代码包
秒哒应用链接
    URL:https://www.miaoda.cn/projects/app-8bb92nctyltt

## 介绍

这是一个采用马卡龙色系设计的个人自我介绍网站，用于展示个人信息、教育背景、兴趣爱好和技能特长。网站采用单页滚动布局，支持移动端和桌面端浏览。

## 功能特点

- 🎨 **马卡龙色系设计**：采用薄荷绿、樱花粉、天空蓝、薰衣草紫等柔和色调
- 📱 **响应式布局**：完美适配移动端和桌面端
- 🎯 **单页滚动**：流畅的页面滚动体验
- 💫 **精美动画**：卡片悬停效果和平滑过渡动画
- 🎭 **圆角设计**：大量使用圆角增加亲和力
- 📦 **卡片式布局**：内容采用卡片形式展示，层次分明

## 页面结构

- **首页（Hero Section）**：展示个人头像和基本介绍
- **关于我（About Section）**：详细的个人信息和教育背景
- **兴趣爱好（Hobbies Section）**：展示6个兴趣爱好卡片
- **技能特长（Skills Section）**：专业技能和语言能力展示
- **联系方式（Contact Section）**：邮箱、电话和社交媒体链接

## 如何自定义内容

打开 `src/pages/HomePage.tsx` 文件，替换以下内容：

1. **个人信息**：搜索 `[你的名字]`、`[你的年龄]` 等占位符并替换
2. **教育背景**：修改学校、专业等信息
3. **兴趣爱好**：可以修改6个兴趣卡片的标题和描述
4. **技能特长**：调整技能名称和熟练度百分比
5. **联系方式**：更新邮箱、电话和社交媒体链接

## 部署到 GitHub Pages

1. 在 GitHub 上创建一个新仓库
2. 将代码推送到仓库
3. 在仓库设置中启用 GitHub Pages
4. 选择部署分支（通常是 main 或 gh-pages）
5. 等待几分钟后，网站就会在 `https://你的用户名.github.io/仓库名` 上线

详细步骤：
```bash
# 初始化 git 仓库
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送代码
git push -u origin main

# 构建项目
npm run build

# 部署到 gh-pages 分支（需要先安装 gh-pages）
npm install -g gh-pages
gh-pages -d dist
```

## 目录结构

```
├── README.md # 说明文档
├── components.json # 组件库配置
├── index.html # 入口文件
├── package.json # 包管理
├── postcss.config.js # postcss 配置
├── public # 静态资源目录
│   ├── favicon.png # 图标
│   └── images # 图片资源
├── src # 源码目录
│   ├── App.tsx # 入口文件
│   ├── components # 组件目录
│   ├── contexts # 上下文目录
│   ├── db # 数据库配置目录
│   ├── hooks # 通用钩子函数目录
│   ├── index.css # 全局样式
│   ├── layout # 布局目录
│   ├── lib # 工具库目录
│   ├── main.tsx # 入口文件
│   ├── routes.tsx # 路由配置
│   ├── pages # 页面目录
│   ├── services  # 数据库交互目录
│   ├── types   # 类型定义目录
├── tsconfig.app.json  # ts 前端配置文件
├── tsconfig.json # ts 配置文件
├── tsconfig.node.json # ts node端配置文件
└── vite.config.ts # vite 配置文件
```

## 技术栈

Vite、TypeScript、React、Supabase

## 本地开发

### 如何在本地编辑代码？

您可以选择 [VSCode](https://code.visualstudio.com/Download) 或者您常用的任何 IDE 编辑器，唯一的要求是安装 Node.js 和 npm.

### 环境要求

```
# Node.js ≥ 20
# npm ≥ 10
例如：
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

具体安装步骤如下：

### 在 Windows 上安装 Node.js

```
# Step 1: 访问Node.js官网：https://nodejs.org/，点击下载后，会根据你的系统自动选择合适的版本（32位或64位）。
# Step 2: 运行安装程序：下载完成后，双击运行安装程序。
# Step 3: 完成安装：按照安装向导完成安装过程。
# Step 4: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 在 macOS 上安装 Node.js

```
# Step 1: 使用Homebrew安装（推荐方法）：打开终端。输入命令brew install node并回车。如果尚未安装Homebrew，需要先安装Homebrew，
可以通过在终端中运行如下命令来安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
或者使用官网安装程序：访问Node.js官网。下载macOS的.pkg安装包。打开下载的.pkg文件，按照提示完成安装。
# Step 2: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 安装完后按照如下步骤操作：

```
# Step 1: 下载代码包
# Step 2: 解压代码包
# Step 3: 用IDE打开代码包，进入代码目录
# Step 4: IDE终端输入命令行，安装依赖：npm i
# Step 5: IDE终端输入命令行，启动开发服务器：npm run dev -- --host 127.0.0.1
```

### 如何开发后端服务？

配置环境变量，安装相关依赖
如需使用数据库，请使用 supabase 官方版本或自行部署开源版本的 Supabase

### 如何配置应用中的三方 API？

具体三方 API 调用方法，请参考帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。

## 了解更多

您也可以查看帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。
