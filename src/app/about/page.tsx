import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-bold text-7xl">
        About me 🎙️
      </p>
    </div>
  )
}
