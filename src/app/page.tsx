import { getAllNotes } from '@/lib/notes'

export default async function Home() {
  const notes = await getAllNotes()

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center mb-12 sm:mb-20">
        <h1
          className="text-4xl sm:text-5xl font-bold"
          style={{
            color: '#1a1a1a',
            fontFamily: 'var(--font-noto-serif)'
          }}
        >
          智慧殿堂
        </h1>
        <p className="mt-4 text-lg" style={{ color: '#3d3d3d' }}>
          精选思考，深度阅读
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {notes.map((note) => (
          <a
            key={note.id}
            href={`/api/notes/${note.id}/html`}
            className="block bg-white p-8 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-gray-200"
          >
            <p className="text-sm font-bold" style={{ color: '#4a6f92' }}>
              {note.author}
            </p>
            <h3
              className="text-xl font-bold mt-2"
              style={{
                color: '#1a1a1a',
                fontFamily: 'var(--font-noto-serif)'
              }}
            >
              {note.title}
            </h3>
            <p
              className="text-base mt-4 leading-relaxed"
              style={{ color: '#3d3d3d' }}
            >
              {note.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: '#eaddc7',
                    color: '#3d3d3d'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="text-sm font-bold mt-6 flex items-center group-hover:underline"
              style={{ color: '#4a6f92' }}
            >
              <span>开始阅读</span>
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </main>

      <footer
        className="text-center mt-20 text-sm"
        style={{ color: '#3d3d3d' }}
      >
        <p>&copy; 2025 智慧殿堂. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
