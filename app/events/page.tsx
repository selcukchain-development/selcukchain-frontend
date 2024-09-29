'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Coffee, Coins, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getEvents } from "@/services/api"

interface Event {
    _id: string;
    title: string;
    description: string;
    type: 'Education' | 'Talk' | 'Workshop';
    link: string;
}

export default function Events() {
    const [showAll, setShowAll] = useState(false)
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

    const getEventIcon = (type: Event['type']) => {
        switch (type) {
            case 'Education':
                return BookOpen
            case 'Talk':
                return Coffee
            case 'Workshop':
                return Coins
            default:
                return BookOpen
        }
    }

    const getEventColor = (type: Event['type']) => {
        switch (type) {
            case 'Education':
                return 'from-indigo-500 to-indigo-600'
            case 'Talk':
                return 'from-amber-500 to-amber-600'
            case 'Workshop':
                return 'from-teal-500 to-teal-600'
            default:
                return 'from-gray-500 to-gray-600'
        }
    }

    const visibleEvents = showAll ? events : events.slice(0, 3)

    return (
        <section className=" text-white py-20 md:py-28">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    SelcukChain Etkinliklerimiz
                </motion.h1>
                <motion.p 
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Topluluğumuzla düzenlediğimiz etkinliklere katılarak blockchain dünyasında yerinizi alın.
                </motion.p>
                
                {isLoading ? (
                    <p className="text-center text-gray-300">Etkinlikler yükleniyor...</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {visibleEvents.map((event, idx) => {
                            const EventIcon = getEventIcon(event.type)
                            const eventColor = getEventColor(event.type)
                            return (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`bg-gradient-to-br ${eventColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                                >
                                    <div className="flex items-center mb-4">
                                        <EventIcon className="h-8 w-8 text-white mr-3" />
                                        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                                    </div>
                                    <p className="text-white text-opacity-90 mb-6">{event.description}</p>
                                    <Button variant="secondary" className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300" asChild>
                                        <Link href={`/events/${event._id}`}>
                                            Daha fazla bilgi <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
                
                {events.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 text-center"
                    >
                        <Button
                            variant="outline"
                            onClick={() => setShowAll(!showAll)}
                            className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            {showAll ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                            <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
