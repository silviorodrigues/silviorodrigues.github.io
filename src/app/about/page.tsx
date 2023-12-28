import { Metadata } from 'next';
import Image from 'next/image'
import profilePicture from 'public/images/profile-picture.png';
import career from '../data/career';

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  const renderCareer = () =>
    career.map((job, index) => {
      return (
        <div className="my-8 lg:my-12" key={index}>
          <h3 className="font-bold text-lg mb-2">{ job.title }</h3>
          <p className="text-neutral-400">
            <a
              href={ job.url }
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              { job.company }
            </a> • { job.location }
          </p>
          <p className="text-neutral-400">
            { job.startDate } - { job.endDate || 'Present' }
          </p>
        </div>
      )
    })

  return (
    <div className="flex flex-col lg:pt-[80px] xl:px-[150px] leading-8">
      <h1 className="font-bold text-5xl mb-12">
        <span className="linear-wipe">About me</span> 🎙️
      </h1>

      <div className="lg:flex lg:gap-24">
        <Image
          src={profilePicture}
          alt="Picture of Silvio Rodrigues"
          className="rounded-lg xl:mb-0 mb-8"
          placeholder="blur"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />

        <div>
          <p className="text-neutral-400 mb-4">
            Hey hey! I&apos;m <strong className="text-neutral-200">Silvio Rodrigues</strong>, a software engineer (Front End) from Brazil 🇧🇷 living in Toronto, Canada 🇨🇦.
          </p>
          <p className="text-neutral-400 mb-4">
            I&apos;ve been <strong className="text-neutral-200">writing code since 2013</strong> and I&apos;m currently working at { career[0].company } as a { career[0].title }.
          </p>
          <p className="text-neutral-400 mb-4">
          I love lists, planning things and I&apos;ve been trying to <strong className="text-neutral-200">create some side projects</strong>. Outside of work life, I like trying new beers and watching soccer (yes, I have a list for those things too).
          </p>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <h2 className="font-bold text-4xl mb-8">Career</h2>

        { renderCareer() }
      </div>
    </div>
  )
}
