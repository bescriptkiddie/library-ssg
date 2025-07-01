// 读书笔记的基本信息类型
export interface BookNote {
  id: string;                    // 唯一标识符
  title: string;                 // 笔记标题
  bookTitle: string;             // 书籍名称
  author: string;                // 书籍作者
  description: string;           // 笔记简介
  tags: string[];               // 标签
  createdAt: string;            // 创建时间
  updatedAt: string;            // 更新时间
  htmlFileName: string;         // HTML文件名
  coverImage?: string;          // 封面图片路径
  readingProgress?: number;     // 阅读进度 (0-100)
  rating?: number;              // 评分 (1-5)
  category: string;             // 分类
}

// 笔记元数据类型
export interface NoteMetadata {
  wordCount: number;            // 字数统计
  readingTime: number;          // 预计阅读时间（分钟）
  lastModified: string;         // 最后修改时间
  fileSize: number;             // 文件大小（字节）
}

// 完整的笔记信息类型
export interface FullBookNote extends BookNote {
  metadata: NoteMetadata;
  htmlContent?: string;         // HTML内容（仅在详情页加载）
}

// 笔记分类类型
export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;                // 分类颜色
  count: number;                // 该分类下的笔记数量
}

// 搜索和筛选参数类型
export interface SearchFilters {
  query?: string;               // 搜索关键词
  category?: string;            // 分类筛选
  tags?: string[];              // 标签筛选
  author?: string;              // 作者筛选
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 分页类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
