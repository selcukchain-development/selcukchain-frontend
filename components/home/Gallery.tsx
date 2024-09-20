import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface EventImage {
  src: string
  alt: string
  eventName: string
  eventDetails: string
  size: 'small' | 'medium' | 'large'
}

export function Gallery() {
  const [flipped, setFlipped] = useState<number | null>(null)

  const eventImages: EventImage[] = [
    {
      src: '/event1.jpeg',
      alt: 'Blockchain Workshop',
      eventName: 'Blockchain Workshop',
      eventDetails: 'Katılımcılar blockchain teknolojisinin temellerini öğrendi.',
      size: 'medium'
    },
    {
      src: '/event2.jpeg',
      alt: 'DeFi Meetup',
      eventName: 'DeFi Meetup',
      eventDetails: 'Merkeziyetsiz finans üzerine tartışmalar ve sunumlar yapıldı.',
      size: 'large'
    },
    {
      src: '/event3.jpeg',
      alt: 'Hackathon',
      eventName: 'SelcukChain Hackathon',
      eventDetails: '48 saat süren yoğun bir geliştirme maratonu gerçekleştirildi.',
      size: 'small'
    },
    {
      src: '/event1.jpeg',
      alt: 'Blockchain Conference',
      eventName: 'Blockchain Conference',
      eventDetails: 'Sektör liderleri ile blockchain geleceği tartışıldı.',
      size: 'medium'
    },
    {
      src: '/event2.jpeg',
      alt: 'Crypto Art Exhibition',
      eventName: 'Crypto Art Exhibition',
      eventDetails: 'NFT sanatçıları eserlerini sergiledi.',
      size: 'small'
    },
    {
      src: '/event3.jpeg',
      alt: 'Blockchain Developers Meetup',
      eventName: 'Blockchain Developers Meetup',
      eventDetails: 'Geliştiriciler en son blockchain teknolojilerini paylaştı.',
      size: 'large'
    },
  ]

  const getCardSize = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return 'h-48 col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-1'
      case 'medium':
        return 'h-64 col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-2'
      case 'large':
        return 'h-80 col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3'
      default:
        return 'h-64 col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-2'
    }
  }

  return (
    <section id="gallery" className="bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Etkinlik Galerisi</h2>
        <div className="grid grid-cols-6 gap-4">
          {eventImages.map((event, idx) => (
            <motion.div
              key={idx}
              className={`relative ${getCardSize(event.size)} rounded-xl overflow-hidden cursor-pointer`}
              onHoverStart={() => setFlipped(idx)}
              onHoverEnd={() => setFlipped(null)}
            >
              <motion.div
                className="absolute w-full h-full"
                initial={false}
                animate={{ rotateY: flipped === idx ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Image
                  src={event.src}
                  alt={event.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </motion.div>
              <motion.div
                className="absolute w-full h-full bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-xl flex flex-col justify-center items-center text-center"
                initial={false}
                animate={{ rotateY: flipped === idx ? 0 : -180 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
                <p className="text-sm">{event.eventDetails}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
