"use client"

import { motion } from "framer-motion"
import { BookOpen, Coffee, Coins, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Education() {
    const courses = [
        {
          title: 'Blockchain 101',
          description: 'Topluluğumuzla birlikte blockchain teknolojisinin temellerini keşfedin ve tartışın.',
          slug: 'blockchain-101',
          icon: BookOpen,
          color: 'from-indigo-500 to-indigo-600',
        },
        {
          title: 'Kod ve Kahve',
          description: 'Haftalık buluşmalarımızda akıllı sözleşmeler üzerine çalışın ve deneyimlerinizi paylaşın.',
          slug: 'kod-ve-kahve',
          icon: Coffee,
          color: 'from-amber-500 to-amber-600',
        },
        {
          title: 'DeFi Çalışma Grubu',
          description: 'Merkeziyetsiz finans projelerini inceleyin ve kendi fikirlerinizi geliştirin.',
          slug: 'defi-calisma-grubu',
          icon: Coins,
          color: 'from-teal-500 to-teal-600',
        },
      ]
  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SelcukChain Eğitimleri
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Blockchain dünyasını keşfetmek için düzenlediğimiz eğitim programları
        </motion.p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${course.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="flex items-center mb-4">
                <course.icon className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              </div>
              <p className="text-white text-opacity-90 mb-6">{course.description}</p>
              <Button variant="secondary" className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300" asChild>
                <Link href={`/education/${course.slug}`}>
                  Daha fazla bilgi <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
