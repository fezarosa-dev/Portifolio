import type { Author } from '@/lib/supabase/queries'

export function AuthorNames({ authors }: { authors: Author[] }) {
  return authors.map((author, i) => (
    <span key={author.id}>
      {i > 0 && (i === authors.length - 1 ? ' e ' : ', ')}
      {author.url ? (
        <a
          href={author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-signal hover:underline"
        >
          {author.name}
        </a>
      ) : (
        author.name
      )}
    </span>
  ))
}
