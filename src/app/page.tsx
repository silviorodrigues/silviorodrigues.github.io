import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Silvio Rodrigues',
  description: 'Silvio Rodrigues — contato e projetos.',
}

export default function Home() {
  return (
    <main className={styles.page} lang="pt-BR">
      <div className={styles.content}>
        <h1 className={styles.name}>Silvio Rodrigues</h1>
        <p className={styles.role} lang="en">
          Staff Software Engineer @{' '}
          <a href="https://www.koho.ca/" target="_blank" rel="noopener noreferrer">
            KOHO
          </a>
        </p>
        <nav className={styles.contact} aria-label="Contato e perfis de Silvio Rodrigues">
          <a href="mailto:hi@silviorodrigues.dev">Email</a>
          <a
            href="https://www.linkedin.com/in/silviorrr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/silviorodrigues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
        <section className={styles.projects} aria-labelledby="projects-title">
          <h2 id="projects-title">Projetos</h2>
          <ul>
            {projects.map(({ name, url }) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
