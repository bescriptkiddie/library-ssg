# 数据存储结构说明

这个目录用于存储读书笔记的相关数据。

## 目录结构

```
data/
├── notes/          # 存储HTML格式的读书笔记
│   ├── note-1.html
│   ├── note-2.html
│   └── ...
├── metadata/       # 存储笔记的元数据信息
│   ├── notes.json  # 所有笔记的索引文件
│   └── categories.json # 分类信息
└── README.md       # 本说明文件
```

## 使用方法

### 1. 添加新的读书笔记

1. 将AI生成的HTML文件放入 `notes/` 目录
2. 在 `metadata/notes.json` 中添加对应的元数据信息
3. 如果有封面图片，放入 `public/covers/` 目录

### 2. 元数据格式

`metadata/notes.json` 文件应该包含一个笔记数组，每个笔记包含以下信息：

```json
{
  "notes": [
    {
      "id": "unique-id",
      "title": "笔记标题",
      "bookTitle": "书籍名称",
      "author": "作者",
      "description": "简介",
      "tags": ["标签1", "标签2"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "htmlFileName": "note-1.html",
      "coverImage": "cover-1.jpg",
      "category": "技术",
      "rating": 5
    }
  ]
}
```

### 3. 分类配置

`metadata/categories.json` 文件定义可用的分类：

```json
{
  "categories": [
    {
      "id": "tech",
      "name": "技术",
      "description": "技术相关书籍",
      "color": "#3B82F6"
    }
  ]
}
```
