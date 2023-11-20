import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools',
}

export default function Tools() {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-bold text-7xl">
        Hardware<br/>and<br/>Software<br/>I use 🛠️
      </p>
    </div>
  )
}
