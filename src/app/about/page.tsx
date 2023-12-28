import { Metadata } from 'next';
import Image from 'next/image'
import profilePicture from 'public/images/profile-picture.png';

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
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
            I&apos;ve been <strong className="text-neutral-200">writing code since 2013</strong> and I&apos;m currently working at KOHO as a Senior Front End Engineer.
          </p>
          <p className="text-neutral-400 mb-4">
          I love lists, planning things and I&apos;ve been trying to <strong className="text-neutral-200">create some side projects</strong>. Outside of work life, I like trying new beers and watching soccer (yes, I have a list for those things too).
          </p>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <h2 className="font-bold text-4xl mb-8">Career</h2>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Senior Front End Developer</h3>
          <p className="text-neutral-400">
            <a
              href="https://www.koho.ca/"
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              KOHO
            </a> • Toronto, Canada
          </p>
          <p className="text-neutral-400">
            Jan 2021 - Present
          </p>
        </div>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Front End Developer</h3>
          <p className="text-neutral-400">
            <a
              href="https://www.mlabs.io/en"
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              mLabs
            </a> • São José dos Campos, Brazil
          </p>
          <p className="text-neutral-400">
            Apr 2019 - Dec 2020
          </p>
        </div>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Front End Developer</h3>
          <p className="text-neutral-400">
            <a
              href="https://www.locaweb.com.br/"
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              Locaweb
            </a> • São Paulo, Brazil
          </p>
          <p className="text-neutral-400">
            Mar 2017 - Apr 2019
          </p>
        </div>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Front End Developer</h3>
          <p className="text-neutral-400">
            <a
              href="https://viverdeblog.com/"
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              Viver de Blog
            </a> • Remote, Brazil
          </p>
          <p className="text-neutral-400">
            Aug 2016 - Feb 2017
          </p>
        </div>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Front End Developer</h3>
          <p className="text-neutral-400">
            <a
              href="https://designa.com.br/"
              target="_blank"
              className="underline underline-offset-4 text-neutral-200"
            >
              Designa
            </a> • Pindamonhangaba, Brazil
          </p>
          <p className="text-neutral-400">
            Dec 2015 - Aug 2016
          </p>
        </div>

        <div className="my-8 lg:my-12">
          <h3 className="font-bold text-lg mb-2">Founder & Web Developer</h3>
          <p className="text-neutral-400">
            <span
              className="underline underline-offset-4 text-neutral-200"
            >
              Levit
            </span> • Caçapava, Brazil
          </p>
          <p className="text-neutral-400">
            Jul 2013 - Nov 2015
          </p>
        </div>
      </div>
    </div>
  )
}
