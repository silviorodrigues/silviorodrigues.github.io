import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(23,23,23,.82)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[700px] items-center justify-between px-6 py-3">
        <Link href="/#top" aria-label="Home" className="text-text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/#work"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-[#262626] hover:text-text-primary"
          >
            Writing
          </Link>
          <Link
            href="/#subscribe"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-[#262626] hover:text-text-primary"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
