# 个人网站自定义指南

## 快速开始

本指南将帮助您快速自定义这个个人自我介绍网站，使其展示您自己的信息。

## 修改个人信息

打开 `src/pages/HomePage.tsx` 文件，按照以下步骤修改：

### 1. 修改导航栏标题

找到第48行左右：
```tsx
<div className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-lavender bg-clip-text text-transparent">
  我的个人网站  // 修改这里
</div>
```

### 2. 修改首页标题和介绍

找到第127-132行左右：
```tsx
<h1 className="text-3xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-lavender bg-clip-text text-transparent">
  你好，我是 [你的名字]  // 修改这里
</h1>
<p className="text-base xl:text-2xl text-muted-foreground max-w-2xl">
  一个热爱生活、追求梦想的 [你的专业] 学生  // 修改这里
</p>
```

### 3. 修改基本信息

找到第165-172行左右：
```tsx
<p><span className="font-semibold text-foreground">姓名：</span>[你的名字]</p>
<p><span className="font-semibold text-foreground">年龄：</span>[你的年龄]</p>
<p><span className="font-semibold text-foreground">家乡：</span>[你的家乡]</p>
<p><span className="font-semibold text-foreground">座右铭：</span>[你的座右铭]</p>
```

### 4. 修改教育背景

找到第185-192行左右：
```tsx
<p><span className="font-semibold text-foreground">学校：</span>[你的学校]</p>
<p><span className="font-semibold text-foreground">专业：</span>[你的专业]</p>
<p><span className="font-semibold text-foreground">学历：</span>[本科/研究生]</p>
<p><span className="font-semibold text-foreground">入学时间：</span>[入学年份]</p>
```

### 5. 修改个人简介

找到第205行左右：
```tsx
<p className="text-sm xl:text-base text-muted-foreground leading-relaxed">
  [在这里写一段关于你自己的介绍...]  // 修改这里
</p>
```

### 6. 修改兴趣爱好

找到第219-261行左右，修改6个兴趣卡片的内容：
```tsx
{
  icon: <Music className="w-8 h-8 xl:w-12 xl:h-12" />,
  title: '音乐',  // 修改标题
  description: '喜欢听各种类型的音乐...',  // 修改描述
  color: 'primary',
  image: '...'
}
```

### 7. 修改技能特长

找到第302-319行左右，修改专业技能：
```tsx
{ name: 'Web开发', level: 85, color: 'bg-primary' },  // 修改技能名称和熟练度
{ name: '数据分析', level: 75, color: 'bg-secondary' },
{ name: '项目管理', level: 70, color: 'bg-lavender' }
```

找到第328-345行左右，修改语言能力：
```tsx
{ name: '中文', level: 100, color: 'bg-primary' },
{ name: '英语', level: 80, color: 'bg-secondary' },
{ name: '日语', level: 60, color: 'bg-lavender' }
```

找到第355-368行左右，修改计算机技能标签。

### 8. 修改联系方式

找到第390-420行左右：
```tsx
<p className="font-medium">your.email@example.com</p>  // 修改邮箱
<p className="font-medium">+86 123 4567 8900</p>  // 修改电话
<p className="font-medium">[你的城市]</p>  // 修改城市
```

修改社交媒体链接：
```tsx
<a href="https://github.com" target="_blank" rel="noopener noreferrer">  // 修改链接
<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">  // 修改链接
```

### 9. 修改页脚

找到第445行左右：
```tsx
<p>© 2025 [你的名字]. All rights reserved.</p>  // 修改这里
```

## 修改配色方案

如果您想调整马卡龙色系的具体颜色，可以编辑 `src/index.css` 文件：

```css
:root {
  /* 薄荷绿 */
  --primary: 160 55% 65%;
  /* 樱花粉 */
  --secondary: 340 75% 80%;
  /* 天空蓝 */
  --sky-blue: 200 70% 75%;
  /* 薰衣草紫 */
  --lavender: 270 50% 75%;
  /* 柠檬黄 */
  --lemon: 50 90% 80%;
  /* 蜜桃橙 */
  --peach: 20 85% 75%;
}
```

颜色格式为 HSL（色相 饱和度% 亮度%）。

## 更换图片

### 更换头像

找到第117行左右：
```tsx
<img
  src="https://miaoda-site-img.cdn.bcebos.com/images/40d9de32-7639-4433-a5f9-ba17ad250207.jpg"
  alt="个人头像"
  className="w-full h-full rounded-full object-cover"
/>
```

将 `src` 属性替换为您自己的头像图片URL。

### 更换兴趣爱好图片

在兴趣爱好数组中（第219-261行），每个爱好都有一个 `image` 属性，替换为您想要的图片URL。

## 本地预览

修改完成后，在终端运行：
```bash
npm run dev -- --host 127.0.0.1
```

然后在浏览器中打开 `http://127.0.0.1:5173` 查看效果。

## 构建生产版本

准备部署时，运行：
```bash
npm run build
```

构建完成的文件将在 `dist` 目录中。

## 需要帮助？

如果在自定义过程中遇到问题，可以：
1. 检查浏览器控制台是否有错误信息
2. 确保所有占位符都已正确替换
3. 运行 `npm run lint` 检查代码格式
4. 参考 README.md 中的技术文档
