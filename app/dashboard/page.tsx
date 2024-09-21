"use client"

import { Card } from "@/components/ui/card"
import { 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart2,
  TrendingUp,
  DollarSign
} from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center">
              <Users className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Toplam Üye</p>
                <p className="text-3xl font-bold">1,234</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Aktif Kurslar</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Yaklaşan Etkinlikler</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center">
              <BarChart2 className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Aylık Ziyaretçi</p>
                <p className="text-3xl font-bold">10,567</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center">
              <TrendingUp className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Büyüme Oranı</p>
                <p className="text-3xl font-bold">15%</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center">
              <DollarSign className="h-10 w-10 mr-4" />
              <div>
                <p className="text-sm opacity-80">Toplam Gelir</p>
                <p className="text-3xl font-bold">$25,400</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
