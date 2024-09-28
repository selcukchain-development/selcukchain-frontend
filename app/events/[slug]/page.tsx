'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const events = [
  {
    title: 'Blockchain 101 Atölyesi',
    description: 'Blockchain teknolojisinin temellerini keşfedin ve tartışın.',
    slug: 'blockchain-101-atolye',
    fullDescription: 'Bu kapsamlı etkinlik, blockchain teknolojisinin temellerini anlamak isteyenler için tasarlanmıştır. Kriptografi, dağıtık sistemler ve konsensus mekanizmaları gibi temel konuları ele alacağız.',
    duration: '2 saat',
    schedule: '20 Şubat 2024, 14:00 - 16:00',
    location: 'Selçuk Üniversitesi, Konya',
    maxParticipants: 30,
    organizer: 'Ates Bostancibasi',
    syllabus: [
      'Blockchain\'e Giriş',
      'Kriptografi Temelleri',
      'Konsensus Mekanizmaları',
      'Akıllı Sözleşmeler',
      'Blockchain Uygulamaları',
      'Blockchain\'in Geleceği',
    ],
    image: '/event3.jpeg'
  },
  // Diğer etkinlikler burada olabilir
  {
    
    title: 'DeFi Proje Geliştirme',
    description: 'Merkeziyetsiz finans projeleri hakkında derinlemesine bilgi edinin ve projeler geliştirin.',
    slug: 'defi-proje-gelistirme',
    fullDescription: 'Bu etkinlik, DeFi projeleri hakkında bilgi edinmek ve projeler geliştirmek isteyenler için tasarlanmıştır. Ethereum, Solana ve diğer blockchain platformlarında DeFi projeleri geliştirmek için gerekli bilgileri öğreneceksiniz.',
    duration: '3 saat',
    schedule: '25 Şubat 2024, 10:00 - 13:00',
    location: 'Selçuk Üniversitesi, Konya',
    maxParticipants: 20,
    
    organizer: 'Ebrar Tamer',
    syllabus: [
      'DeFi Temelleri',
      'Ethereum ve Solana',
      'Akıllı Sözleşmeler',
      'Tokenomics',
      'DeFi Projeleri',
      'DeFi\'in Geleceği',
    ],
    image: '/event4.png'
  },
  // Diğer etkinlikler burada olabilir

    {
    title: 'Kod ve Kahve Buluşması'
    ,
    description: 'Kahvenizi alın ve topluluğumuzla birlikte kodlama üzerine keyifli vakit geçirin.',
    slug: 'kod-ve-kahve-bulusmasi',
    fullDescription: 'Bu etkinlik, kodlama ve kahvenizi birleştiren bir buluşma sunuyor. Topluluk ile birlikte kodlama üzerine keyifli vakit geçirin ve yeni arkadaşlar edinin.',
    duration: '2 saat',
    schedule: '30 Şubat 2024, 15:00 - 17:00',
    location: 'Selçuk Üniversitesi, Konya',
    maxParticipants: 25,
    organizer: 'Ates Bostancibasi',
    syllabus: [
      'Kodlama Temelleri',
      'Kahve İçme Teknikleri',
      'Topluluk Etkinlikleri',
      'Kodlama Hikayeleri',
      'Kahve İçme İşleri',
    ],
    image: '/event5.png'
  },
]
export default function EventPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const event = events.find(e => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  const tabContent = {
    overview: (
      <div>
        <p className="text-lg leading-relaxed text-gray-300 mb-6">{event.fullDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Calendar className="mr-2" /> Süre
            </h3>
            <p className="text-gray-200">{event.duration}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Clock className="mr-2" /> Program
            </h3>
            <p className="text-gray-200">{event.schedule}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Users className="mr-2" /> Maksimum Katılımcı
            </h3>
            <p className="text-gray-200">{event.maxParticipants} kişi</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <MapPin className="mr-2" /> Konum
            </h3>
            <p className="text-gray-200">{event.location}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Users className="mr-2" /> Düzenleyen
            </h3>
            <p className="text-gray-200">{event.organizer}</p>
          </div>
        </div>
      </div>
    ),
    syllabus: (
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-primary">Etkinlik Programı</h3>
        <ul className="space-y-2">
          {event.syllabus.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              <span className="text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }

  return (
    <div className="bg-neutral-dark text-white min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {event.title}
        </motion.h1>
        <div className="grid gap-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative w-full h-0 pb-[56.25%] mb-8 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                {['overview', 'syllabus'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    className={`px-4 py-2 font-medium text-sm rounded-lg ${activeTab === tab ? 'bg-primary text-white' : 'border-gray-600 text-gray-300'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'overview' ? 'Genel Bakış' : 'Etkinlik Programı'}
                  </Button>
                ))}
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tabContent[activeTab as keyof typeof tabContent]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}