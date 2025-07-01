import fs from 'fs';
import path from 'path';
import { BookNote, FullBookNote, Category, NoteMetadata } from '@/types';

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data');
const NOTES_DIR = path.join(DATA_DIR, 'notes');
const METADATA_DIR = path.join(DATA_DIR, 'metadata');
const NOTES_INDEX_FILE = path.join(METADATA_DIR, 'notes.json');
const CATEGORIES_FILE = path.join(METADATA_DIR, 'categories.json');

/**
 * 读取所有笔记的基本信息
 */
export async function getAllNotes(): Promise<BookNote[]> {
  try {
    const notesData = fs.readFileSync(NOTES_INDEX_FILE, 'utf-8');
    const { notes } = JSON.parse(notesData);
    return notes;
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
}

/**
 * 根据ID获取单个笔记的完整信息
 */
export async function getNoteById(id: string): Promise<FullBookNote | null> {
  try {
    const notes = await getAllNotes();
    const note = notes.find(n => n.id === id);
    
    if (!note) {
      return null;
    }

    // 读取HTML内容
    const htmlFilePath = path.join(NOTES_DIR, note.htmlFileName);
    let htmlContent = '';
    
    if (fs.existsSync(htmlFilePath)) {
      htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    }

    // 生成元数据
    const metadata: NoteMetadata = {
      wordCount: htmlContent.replace(/<[^>]*>/g, '').length,
      readingTime: Math.ceil(htmlContent.replace(/<[^>]*>/g, '').length / 500), // 假设每分钟500字
      lastModified: fs.existsSync(htmlFilePath) 
        ? fs.statSync(htmlFilePath).mtime.toISOString()
        : note.updatedAt,
      fileSize: fs.existsSync(htmlFilePath) 
        ? fs.statSync(htmlFilePath).size
        : 0
    };

    return {
      ...note,
      htmlContent,
      metadata
    };
  } catch (error) {
    console.error('Error reading note by id:', error);
    return null;
  }
}

/**
 * 获取所有分类信息
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const categoriesData = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    const { categories } = JSON.parse(categoriesData);
    
    // 统计每个分类的笔记数量
    const notes = await getAllNotes();
    const categoriesWithCount = categories.map((category: Category) => ({
      ...category,
      count: notes.filter(note => note.category === category.name).length
    }));
    
    return categoriesWithCount;
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

/**
 * 根据分类筛选笔记
 */
export async function getNotesByCategory(categoryName: string): Promise<BookNote[]> {
  const notes = await getAllNotes();
  return notes.filter(note => note.category === categoryName);
}

/**
 * 搜索笔记
 */
export async function searchNotes(query: string): Promise<BookNote[]> {
  const notes = await getAllNotes();
  const lowercaseQuery = query.toLowerCase();
  
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowercaseQuery) ||
    note.bookTitle.toLowerCase().includes(lowercaseQuery) ||
    note.author.toLowerCase().includes(lowercaseQuery) ||
    note.description.toLowerCase().includes(lowercaseQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * 获取最新的笔记
 */
export async function getLatestNotes(limit: number = 6): Promise<BookNote[]> {
  const notes = await getAllNotes();
  return notes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * 获取推荐笔记（基于评分）
 */
export async function getFeaturedNotes(limit: number = 3): Promise<BookNote[]> {
  const notes = await getAllNotes();
  return notes
    .filter(note => note.rating && note.rating >= 4)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

/**
 * 检查HTML文件是否存在
 */
export function checkHtmlFileExists(fileName: string): boolean {
  const filePath = path.join(NOTES_DIR, fileName);
  return fs.existsSync(filePath);
}

/**
 * 获取笔记统计信息
 */
export async function getNotesStats() {
  const notes = await getAllNotes();
  const categories = await getCategories();
  
  return {
    totalNotes: notes.length,
    totalCategories: categories.length,
    averageRating: notes.reduce((sum, note) => sum + (note.rating || 0), 0) / notes.length,
    completedNotes: notes.filter(note => note.readingProgress === 100).length
  };
}
