'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { getEvent } from "@/services/api"

export default function EventPage({ params }: { params: { link: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [event, setEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvent()
  }, [])

  const fetchEvent = async () => {
    setIsLoading(true)
    try {
      const response = await getEvent(params.link)
      setEvent(response.data)
    } catch (error) {
      console.error("Error fetching event:", error)
      notFound()
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <div className="bg-neutral-dark text-white min-h-screen flex items-center justify-center">
      <p className="text-2xl">Loading...</p>
    </div>
  }

  if (!event) {
    notFound()
  }

  const tabContent = {
    overview: (
      <div>
        <p className="text-lg leading-relaxed text-gray-300 mb-6">{event.details.fullDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Calendar className="mr-2" /> Süre
            </h3>
            <p className="text-gray-200">{event.details.duration}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Clock className="mr-2" /> Program
            </h3>
            <p className="text-gray-200">{event.details.schedule}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Users className="mr-2" /> Maksimum Katılımcı
            </h3>
            <p className="text-gray-200">{event.details.maxParticipants} kişi</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <MapPin className="mr-2" /> Konum
            </h3>
            <p className="text-gray-200">{event.details.location}</p>
          </div>
          <div className="bg-neutral-dark p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
              <Users className="mr-2" /> Düzenleyen
            </h3>
            <p className="text-gray-200">{event.details.organizer}</p>
          </div>
        </div>
      </div>
    ),
    syllabus: (
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-primary">Etkinlik Programı</h3>
        <ul className="space-y-2">
          {event.details.syllabus.map((item: string, index: number) => (
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
                src={
                  event.details.image ? event.details.image : '/images/default-event-image.jpg'
                }
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