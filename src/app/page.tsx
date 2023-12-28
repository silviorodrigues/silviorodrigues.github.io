import Link from 'next/link';
import career from '@/data/career';

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <p className="linear-wipe font-bold text-4xl mb-8">
        Silvio Rodrigues
      </p>
      <p className="font-bold mb-2">
        { career[0].title } 💅
      </p>
      <p className="text-neutral-400 mb-2">
        currently working at <a className="underline underline-offset-4" href={ career[0].url } target="_blank">{career[0].company }</a> 💼
      </p>
      <p className="text-neutral-400">
        beginner maker, check <Link className="underline underline-offset-4" href="/projects">my projects</Link> 🧪
      </p>
    </div>
  )
}
