import Link from 'next/link';

export default function Header() {
  return (
    <header className="sm:p-4 sm:flex-row flex-col flex items-center justify-between">
      <Link href="/" className="font-bold p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 h-6 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" />
        </svg>

        Silvio Rodrigues
      </Link>

      <nav className="flex sm:gap-12">
        <Link href="/about" className="p-4 font-semibold text-neutral-400">
          About
        </Link>
        <Link href="/projects" className="p-4 font-semibold text-neutral-400">
          Projects
        </Link>
        <Link href="/tools" className="p-4 font-semibold text-neutral-400">
          Tools
        </Link>
      </nav>
    </header>
  )
}