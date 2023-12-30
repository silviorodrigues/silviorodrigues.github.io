import PageTitle from '@/components/page-title';
import projects from '@/data/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My personal projects, made with <3',
}

export default function Projects() {
  const renderProjects = () =>
    projects.map((project, index) => {
      return (
        <a href={project.url} target="_blank" key={index}>
          <div className="mb-8 bg-neutral-800 transition-all hover:outline outline-4 outline-neutral-700 rounded-lg p-8">
            <div
              className="h-10 w-10 mb-8"
              dangerouslySetInnerHTML={{ __html: project.logo }}
            />

            <h2 className="font-bold text-xl mb-2">
              { project.name }
            </h2>

            <p className="text-neutral-400 mb-4">
              { project.description }
            </p>

            <p className="text-sm">
              { project.highlight }
            </p>
          </div>
        </a>
      )
    })

  return (
    <>
      <PageTitle text="My projects" emoji="🧪"/>

      <section>
        { renderProjects() }

        <div className="bg-neutral-800 rounded-lg p-8 text-center mt-12 bg-gradient-to-t from-neutral-900 to-neutral-800">
          <p className="font-bold text-xl mb-2 opacity-10">
            WIP: More to come
          </p>
        </div>
      </section>
    </>
  )
}
