export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col lg:pt-[80px] xl:px-[150px] leading-8">
      {children}
    </div>
  )
}
