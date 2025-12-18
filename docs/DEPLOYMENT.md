# 部署指南

本文档介绍如何将个人网站部署到GitHub Pages或其他平台。

## 前置准备

1. 确保已完成个人信息的自定义（参考 CUSTOMIZATION_GUIDE.md）
2. 确保本地可以正常运行
3. 拥有GitHub账号

## 方法一：部署到GitHub Pages（推荐）

### 步骤1：创建GitHub仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `my-portfolio`（或其他名称）
   - Description: `我的个人介绍网站`
   - 选择 Public（公开）
   - 不要勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 步骤2：推送代码到GitHub

在项目目录下打开终端，执行以下命令：

```bash
# 初始化git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 个人介绍网站"

# 添加远程仓库（替换为你的GitHub用户名和仓库名）
git remote add origin https://github.com/你的用户名/my-portfolio.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤3：配置GitHub Pages

#### 方法A：使用GitHub Actions自动部署

1. 在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 提交并推送这个文件：
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

3. 在GitHub仓库页面：
   - 点击 "Settings"
   - 左侧菜单选择 "Pages"
   - Source 选择 "gh-pages" 分支
   - 点击 "Save"

#### 方法B：手动部署

```bash
# 安装gh-pages工具
npm install -g gh-pages

# 构建项目
npm run build

# 部署到gh-pages分支
gh-pages -d dist
```

然后在GitHub仓库设置中启用GitHub Pages（选择gh-pages分支）。

### 步骤4：访问网站

部署完成后，你的网站将在以下地址可访问：
```
https://你的用户名.github.io/仓库名/
```

例如：`https://zhangsan.github.io/my-portfolio/`

## 方法二：部署到Vercel

### 步骤1：注册Vercel账号

访问 [Vercel](https://vercel.com) 并使用GitHub账号登录。

### 步骤2：导入项目

1. 点击 "New Project"
2. 选择你的GitHub仓库
3. 配置项目：
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 "Deploy"

### 步骤3：访问网站

部署完成后，Vercel会自动分配一个域名，例如：
```
https://my-portfolio-xxx.vercel.app
```

你也可以绑定自己的域名。

## 方法三：部署到Netlify

### 步骤1：注册Netlify账号

访问 [Netlify](https://netlify.com) 并注册账号。

### 步骤2：部署方式选择

#### 方式A：拖拽部署

1. 在本地构建项目：`npm run build`
2. 访问 [Netlify Drop](https://app.netlify.com/drop)
3. 将 `dist` 文件夹拖拽到页面中
4. 等待部署完成

#### 方式B：连接GitHub仓库

1. 点击 "New site from Git"
2. 选择 GitHub
3. 选择你的仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 "Deploy site"

### 步骤3：访问网站

部署完成后，Netlify会分配一个域名，例如：
```
https://random-name-123.netlify.app
```

## 自定义域名

### GitHub Pages

1. 购买域名（如 `yourname.com`）
2. 在域名提供商处添加CNAME记录：
   ```
   www -> 你的用户名.github.io
   ```
3. 在GitHub仓库的 `public` 目录下创建 `CNAME` 文件，内容为你的域名：
   ```
   www.yourname.com
   ```
4. 推送代码，等待DNS生效（可能需要几小时）

### Vercel/Netlify

在平台的域名设置中添加自定义域名，按照提示配置DNS记录即可。

## 更新网站

### GitHub Pages（使用Actions）

只需推送代码到main分支，GitHub Actions会自动构建和部署：
```bash
git add .
git commit -m "更新内容"
git push
```

### Vercel/Netlify

推送代码到GitHub，平台会自动检测并重新部署：
```bash
git add .
git commit -m "更新内容"
git push
```

## 常见问题

### Q: 部署后页面显示空白？
A: 检查浏览器控制台是否有错误，可能是路径配置问题。

### Q: 图片无法显示？
A: 确保图片URL可以公开访问，检查网络连接。

### Q: GitHub Pages部署失败？
A: 检查GitHub Actions日志，确保构建命令正确。

### Q: 如何查看部署日志？
A: 
- GitHub Pages: 查看Actions标签页
- Vercel: 在项目的Deployments页面
- Netlify: 在项目的Deploys页面

## 性能优化建议

1. **图片优化**：使用WebP格式，压缩图片大小
2. **CDN加速**：使用CDN服务加速资源加载
3. **缓存策略**：配置合适的缓存头
4. **代码分割**：利用Vite的代码分割功能

## 安全建议

1. 不要在代码中暴露敏感信息（API密钥、密码等）
2. 使用环境变量管理配置
3. 定期更新依赖包
4. 启用HTTPS（GitHub Pages、Vercel、Netlify默认支持）

## 监控和分析

### 添加Google Analytics

1. 注册 [Google Analytics](https://analytics.google.com)
2. 获取跟踪ID
3. 在 `index.html` 中添加跟踪代码

### 添加百度统计

1. 注册 [百度统计](https://tongji.baidu.com)
2. 获取统计代码
3. 在 `index.html` 中添加统计代码

## 备份建议

1. 定期备份GitHub仓库
2. 保存重要的配置文件
3. 记录域名和DNS配置

## 需要帮助？

- GitHub Pages文档: https://docs.github.com/pages
- Vercel文档: https://vercel.com/docs
- Netlify文档: https://docs.netlify.com
