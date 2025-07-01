import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNoteById, getAllNotes } from '@/lib/notes'

interface NotePageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const notes = await getAllNotes()
  return notes.map((note) => ({
    id: note.id
  }))
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params
  const note = await getNoteById(id)

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium hover:underline"
            style={{ color: '#4a6f92' }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
        </div>
      </nav>

      {/* 文章内容 */}
      <div className="container mx-auto px-4 py-8">
        {/* 文章头部信息 */}
        <header className="mb-8 text-center">
          <p className="text-sm font-bold mb-2" style={{ color: '#4a6f92' }}>
            {note.author}
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              color: '#1a1a1a',
              fontFamily: 'var(--font-noto-serif)'
            }}
          >
            {note.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: '#eaddc7',
                  color: '#3d3d3d'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm" style={{ color: '#666' }}>
            <span>阅读时间: {note.metadata.readingTime} 分钟</span>
            <span className="mx-2">•</span>
            <span>字数: {note.metadata.wordCount.toLocaleString()}</span>
            {note.rating && (
              <>
                <span className="mx-2">•</span>
                <span>
                  评分: {'★'.repeat(note.rating)}
                  {'☆'.repeat(5 - note.rating)}
                </span>
              </>
            )}
          </div>
        </header>

        {/* 查看完整文章按钮 */}
        <div className="text-center mb-8">
          <a
            href={`/api/notes/${id}/html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            style={{ color: '#4a6f92' }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            查看完整文章（原始样式）
          </a>
        </div>

        {/* 简化的文章内容预览 */}
        <article
          className="prose prose-lg max-w-none"
          style={{
            color: '#3d3d3d',
            fontFamily: 'var(--font-noto-sans)'
          }}
        >
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg leading-relaxed mb-6">{note.description}</p>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                这是一篇包含丰富交互效果和精美样式的文章
              </p>
              <a
                href={`/api/notes/${id}/html`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                点击上方按钮查看完整版本 →
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
