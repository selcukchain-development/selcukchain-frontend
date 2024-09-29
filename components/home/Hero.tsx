"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
const images = [
  { src: "/event5.png", alt: "SelcukChain Topluluğu" },
  { src: "/event1.jpeg", alt: "İkinci Resim" },
  { src: "/event2.jpeg", alt: "Üçüncü Resim" },
  // ... diğer resimler
];

const AnimatedText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(intervalId)
      }
    }, delay)

    return () => clearInterval(intervalId)
  }, [text, delay])

  return <span>{displayedText}</span>
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image 
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      
      <div className="relative z-20 text-center px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          <AnimatedText text="SelcukChain Topluluğu" delay={100} />
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
          &quot;Blockchain tutkunlarının buluşma noktası&quot;
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/join">
            <Button size="lg" variant="outline" className="border-blue-400 text-white bg-blue-500 hover:text-white hover:bg-blue-600 transition-colors">
              Topluluğa Katıl
            </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-00 hover:bg-blue-400 hover:text-white transition-colors">
                Etkinliklerimiz
              </Button>
            </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
        {images.map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full mx-1 ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </section>
  )
}
