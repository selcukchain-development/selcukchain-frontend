"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Users className="h-8 w-8 mr-3 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Üyeler</h1>
      </motion.div>
      
      {/* Buraya üye listesi veya tablosu eklenebilir */}
      <p className="text-gray-600">Üye yönetimi için içerik buraya eklenecek.</p>
    </div>
  )
}
