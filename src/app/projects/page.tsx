import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Projects() {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-bold text-7xl">
        My Projects 🧪
      </p>
    </div>
  )
}
