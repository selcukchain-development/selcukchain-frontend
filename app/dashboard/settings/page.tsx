"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Settings className="h-8 w-8 mr-3 text-gray-500" />
        <h1 className="text-3xl font-bold text-gray-800">Ayarlar</h1>
      </motion.div>
      
      {/* Buraya ayarlar formu veya seçenekleri eklenebilir */}
      <p className="text-gray-600">Sistem ayarları için içerik buraya eklenecek.</p>
    </div>
  )
}
