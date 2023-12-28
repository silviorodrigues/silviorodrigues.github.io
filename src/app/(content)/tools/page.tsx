import PageTitle from '@/components/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools',
}

export default function Tools() {
  return (
    <>
      <PageTitle text="Tools I use" emoji="🛠️"/>
    </>
  )
}
