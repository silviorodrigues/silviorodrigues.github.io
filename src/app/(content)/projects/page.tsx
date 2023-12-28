import PageTitle from '@/components/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Projects() {
  return (
    <>
      <PageTitle text="My projects" emoji="🧪"/>
    </>
  )
}
