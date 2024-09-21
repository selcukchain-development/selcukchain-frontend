"use client"

import Link from "next/link"
import { Home, Users, BookOpen, Calendar, Settings, Book } from "lucide-react"
import { motion } from "framer-motion"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Üyeler", href: "/dashboard/users" },
  { icon: BookOpen, label: "Kurslar", href: "/dashboard/courses" },
  { icon: Calendar, label: "Etkinlikler", href: "/dashboard/events" },
  { icon: Settings, label: "Ayarlar", href: "/dashboard/settings" },
  { icon: Book, label: "Kaynaklar", href: "/dashboard/resources" },
  { icon: Users, label: "Hakkımızda", href: "/dashboard/about-us" },
]

export function Sidebar() {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen p-4 space-y-4"
    >
      <div className="flex items-center justify-center mb-8">
        <img src="/selcukchain.jpg" alt="SelcukChain Logo" className="h-12 w-auto" />
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-700"
            >
              <item.icon className="h-5 w-5 text-blue-400" />
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  )
}
