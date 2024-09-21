"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Calendar className="h-8 w-8 mr-3 text-purple-500" />
        <h1 className="text-3xl font-bold text-gray-800">Etkinlikler</h1>
      </motion.div>
      
      {/* Buraya etkinlik listesi veya takvim eklenebilir */}
      <p className="text-gray-600">Etkinlik yönetimi için içerik buraya eklenecek.</p>
    </div>
  )
}
