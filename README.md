# 智慧殿堂 - AI 读书笔记网站

一个基于 Next.js 构建的读书笔记分享平台，专门用于展示 AI 生成的 HTML 格式读书笔记。

## ✨ 项目特色

- 🎨 **精美设计**: 温暖的纸张背景色，优雅的中文字体排版
- 📱 **响应式布局**: 完美适配桌面和移动设备
- ⚡ **快速加载**: 基于 Next.js 的静态生成，加载速度极快
- 🔍 **完美展示**: 直接展示 AI 生成的 HTML 内容，保持原有样式和交互
- 🎯 **简洁导航**: 从首页直接跳转到文章内容，用户体验流畅

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 3. 访问网站

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📁 项目结构

```
scys-ssg/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API路由
│   │   │   └── notes/[id]/html/  # HTML内容API
│   │   ├── notes/[id]/        # 文章详情页（可选）
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── lib/
│   │   └── notes.ts           # 数据管理工具
│   └── types/
│       └── index.ts           # TypeScript类型定义
├── data/
│   ├── notes/                 # HTML读书笔记文件
│   │   ├── caoz.html
│   │   ├── laohua.html
│   │   └── liuxiaopai.html
│   └── metadata/
│       └── notes.json         # 文章元数据
└── public/
    └── covers/                # 封面图片（可选）
```

## 📝 添加新的读书笔记

### 步骤 1: 准备 HTML 文件

将 AI 生成的 HTML 读书笔记文件放入 `data/notes/` 目录中。

**HTML 文件要求:**

- 必须是完整的 HTML 文档（包含 `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` 标签）
- 可以包含内联 CSS 样式和 JavaScript 代码
- 支持外部资源引用（如 Google Fonts、CDN 等）
- 文件名建议使用英文，如 `author-book-notes.html`

**示例 HTML 文件结构:**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>书名 | 作者读书笔记</title>
    <!-- 样式和外部资源 -->
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <style>
      /* 自定义样式 */
    </style>
  </head>
  <body>
    <!-- 文章内容 -->
    <script>
      /* 交互脚本 */
    </script>
  </body>
</html>
```

### 步骤 2: 更新元数据

编辑 `data/metadata/notes.json` 文件，添加新文章的元数据信息。

**元数据格式:**

```json
{
  "notes": [
    {
      "id": "unique-note-id", // 唯一标识符，对应HTML文件名（不含.html）
      "title": "文章标题", // 显示在首页的文章标题
      "bookTitle": "书籍名称", // 原书名
      "author": "作者姓名", // 原书作者
      "description": "文章简介...", // 文章描述，显示在首页卡片中
      "tags": ["标签1", "标签2"], // 文章标签
      "publishDate": "2025-01-01", // 发布日期
      "readingTime": "15分钟", // 预估阅读时间
      "category": "商业思维", // 文章分类
      "coverImage": "/covers/cover.jpg" // 封面图片路径（可选）
    }
  ]
}
```

**重要注意事项:**

- `id` 字段必须与 HTML 文件名完全匹配（不含.html 扩展名）
- JSON 格式必须正确，注意逗号和引号
- 描述中如果包含引号，请使用单引号或转义字符

### 步骤 3: 添加封面图片（可选）

如果需要为文章添加封面图片：

1. 将图片文件放入 `public/covers/` 目录
2. 在元数据中设置 `coverImage` 字段为图片路径

### 步骤 4: 验证配置

1. 重启开发服务器：

```bash
npm run dev
```

2. 访问首页检查新文章是否显示
3. 点击文章卡片测试是否能正常跳转到 HTML 页面

## 🔧 技术架构

### 核心技术栈

- **Next.js 15**: React 全栈框架，使用 App Router
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 实用优先的 CSS 框架
- **中文字体**: Noto Sans SC & Noto Serif SC

### 数据流程

1. **数据读取**: `src/lib/notes.ts` 从文件系统读取 HTML 文件和 JSON 元数据
2. **首页展示**: `src/app/page.tsx` 显示文章卡片列表
3. **内容展示**: `/api/notes/[id]/html` API 路由直接返回 HTML 内容
4. **样式隔离**: HTML 文件保持独立样式，避免与 Next.js 全局样式冲突

### API 路由

- `GET /api/notes/[id]/html` - 返回指定文章的原始 HTML 内容
- 支持所有 HTML 特性：CSS 样式、JavaScript 交互、外部资源等

## 🎨 自定义样式

### 全局样式变量

在 `src/app/globals.css` 中定义了以下 CSS 变量：

```css
:root {
  --bg-paper: #f9f6f1; /* 温暖的纸张背景色 */
  --text-main: #3d3d3d; /* 主要文本颜色 */
  --text-heading: #1a1a1a; /* 标题文本颜色 */
  --accent-primary: #4a6f92; /* 主要强调色 */
  --accent-secondary: #eaddc7; /* 次要强调色 */
}
```

### 修改主题色彩

如需修改网站主题色彩，编辑 `src/app/globals.css` 中的 CSS 变量即可。

## 🚀 部署指南

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. Vercel 会自动检测 Next.js 项目并进行部署

### 其他平台部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📋 常见问题

### Q: HTML 文件中的样式不生效？

A: 确保 HTML 文件是完整的文档结构，包含完整的 `<head>` 和样式定义。

### Q: 新添加的文章不显示？

A: 检查以下几点：

1. HTML 文件是否放在 `data/notes/` 目录中
2. `notes.json` 中的 `id` 是否与 HTML 文件名匹配
3. JSON 格式是否正确
4. 是否重启了开发服务器

### Q: 如何修改首页布局？

A: 编辑 `src/app/page.tsx` 文件，可以修改网格布局、卡片样式等。

### Q: 如何添加搜索功能？

A: 可以在 `src/lib/notes.ts` 中扩展 `searchNotes` 函数，并在首页添加搜索组件。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！
