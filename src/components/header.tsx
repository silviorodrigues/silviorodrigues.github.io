import { FireIcon } from '@heroicons/react/20/solid';

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between">
      <a href="#" className="font-bold p-4">
        <FireIcon className="inline-block w-6 h-6 mr-2"/>
        Silvio Rodrigues
      </a>

      <nav className="flex gap-12">
        <a href="#" className="p-4 font-semibold text-neutral-400">
          About
        </a>
        <a href="#" className="p-4 font-semibold text-neutral-400">
          Projects
        </a>
        <a href="#" className="p-4 font-semibold text-neutral-400">
          Setup
        </a>
      </nav>
    </header>
  )
}
