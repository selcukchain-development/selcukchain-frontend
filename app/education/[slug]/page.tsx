"use client"

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const courses = [
  {
    title: 'Blockchain 101',
    description: 'Topluluğumuzla birlikte blockchain teknolojisinin temellerini keşfedin ve tartışın.',
    slug: 'blockchain-101',
    icon: BookOpen,
    color: 'from-indigo-500 to-indigo-600',
    fullDescription: 'Bu kapsamlı kurs, blockchain teknolojisinin temellerini anlamak isteyenler için tasarlanmıştır. Kriptografi, dağıtık sistemler ve konsensus mekanizmaları gibi temel konuları ele alacağız. Kurs sonunda, blockchain teknolojisinin nasıl çalıştığını ve potansiyel uygulamalarını anlayacaksınız.',
    duration: '8 hafta',
    schedule: 'Her Cumartesi 14:00-16:00',
    instructor: 'Dr. Ahmet Yılmaz',
    maxParticipants: 30,
    prerequisites: ['Temel bilgisayar bilgisi', 'Programlama deneyimi tercih edilir ama zorunlu değildir'],
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
 
]

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const course = courses.find(c => c.slug === params.slug)

  if (!course) {
    notFound()
  }

  const tabContent = {
    overview: (
      <div>
        <p className="text-lg mb-6">{course.fullDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Calendar className="mr-2" /> Süre
            </h3>
            <p>{course.duration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Clock className="mr-2" /> Program
            </h3>
            <p>{course.schedule}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Users className="mr-2" /> Maksimum Katılımcı
            </h3>
            <p>{course.maxParticipants} kişi</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <course.icon className="mr-2" /> Eğitmen
            </h3>
            <p>{course.instructor}</p>
          </div>
        </div>
      </div>
    ),
    syllabus: (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Ders Programı</h3>
        <ul className="space-y-2">
          {course.syllabus.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
    prerequisites: (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Ön Koşullar</h3>
        <ul className="list-disc list-inside space-y-2">
          {course.prerequisites.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    ),
  }

  return (
    <div className="bg-black text-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {course.title}
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="relative w-full h-0 pb-[56.25%] mb-8">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="mb-8">
              <div className="flex space-x-4 mb-4">
                {['overview', 'syllabus', 'prerequisites'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
          <div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-8">
              <h3 className="text-2xl font-semibold mb-4">Kursa Kayıt Ol</h3>
              <p className="mb-6">Bu kursa katılarak blockchain dünyasında ilk adımınızı atın ve geleceğin teknolojisini şekillendiren topluluğun bir parçası olun.</p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                Şimdi Kaydol
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}