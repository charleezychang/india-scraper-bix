import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import Image from 'next/image';
import background from '../src/assets/images/background.svg'

export const metadata = {
  title: 'Indiabix Spaced Repetition',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative h-screen">
        <Providers>
          <Image
            src={background}
            alt=''
            quality="100"
            fill
            className='object-cover'
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}
