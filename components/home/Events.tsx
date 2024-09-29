'use client'

import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, Users, Lightbulb, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEvents } from "@/services/api"

interface Event {
  _id: string;
  title: string;
  description: string;
  type: 'Education' | 'Talk' | 'Workshop' | string;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const response = await getEvents()
      setEvents(response.data)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
    setIsLoading(false)
  }

  const visibleEvents = events.slice(0, 3)

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Education':
        return 'from-indigo-500 to-indigo-600';
      case 'Talk':
        return 'from-amber-500 to-amber-600';
      case 'Workshop':
        return 'from-teal-500 to-teal-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return BookOpen;
      case 'Talk':
        return Users;
      case 'Workshop':
        return Lightbulb;
      default:
        return Rocket;
    }
  }

  return (
    <section id="events" className="bg-white py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Etkinliklerimiz
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Blockchain dünyasını keşfetmek için düzenlediğimiz etkinliklerimize katılın.
        </motion.p>
        {isLoading ? (
          <p className="text-center text-gray-600">Etkinlikler yükleniyor...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {visibleEvents.map((event, idx) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${getEventColor(event.type)} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center mb-4">
                      <EventIcon className="h-8 w-8 text-white mr-3" />
                      <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    </div>
                    <p className="text-white text-opacity-90 mb-6">{event.description}</p>
                  </div>
                  <Button variant="secondary" className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 mt-auto" asChild>
                    <Link href={`/events/${event._id}`}>
                      Daha fazla bilgi <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
        {events.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              asChild
            >
              <Link href="/events">
                Tüm Etkinlikleri Göster
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}