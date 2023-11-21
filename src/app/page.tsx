import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-bold text-4xl mb-8">
        Silvio Rodrigues
      </p>
      <p className="font-bold mb-2">
        Senior Frontend Developer 💅
      </p>
      <p className="text-neutral-400 mb-2">
        currently working at <a className="underline underline-offset-4" href="https://www.koho.ca/" target="_blank">KOHO</a> 💼
      </p>
      <p className="text-neutral-400">
        beginner maker, check <Link className="underline underline-offset-4" href="/projects">my projects</Link> 🧪
      </p>
    </div>
  )
}
