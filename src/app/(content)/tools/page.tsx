import PageTitle from '@/components/page-title';
import tools from '@/data/tools';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'A list of software and hardware I use',
}

export default function Tools() {
  const renderTools = () =>
    Object.entries(tools).map(([_, category], index) => {
      return (
        <div className="mb-16" key={index}>
          <h2 className="font-bold text-2xl mb-2">{ category.name }</h2>
          <ul className="list-disc list-outside ml-8">
            { category.items.map((tool, index) => {
              return (
                <li className="text-neutral-400 text-[.92em]" key={index}>
                  <a href={ `${tool.url}?utm_source=silviorodrigues.dev` } target="_blank" className="underline underline-offset-4 text-neutral-200">
                    { tool.name }
                  </a> - { tool.description }
                </li>
              )
            }) }
          </ul>
        </div>
      )
    });
  return (
    <>
      <PageTitle text="Tools I use" emoji="🛠️"/>
      { renderTools() }
    </>
  )
}
