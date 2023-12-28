export default function PageTitle({ text, emoji }: { text: string, emoji: string}) {
  return (
    <h1 className="font-bold text-3xl md:text-5xl mb-12">
      <span className="linear-wipe">{ text }</span> { emoji }
    </h1>
  )
}
