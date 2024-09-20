import { motion } from "framer-motion"
import { Users, Calendar, Rocket, MessageSquare } from "lucide-react"

export function Stats() {
  const stats = [
    { number: '500+', label: 'Aktif Üye', icon: Users },
    { number: '50+', label: 'Topluluk Etkinliği', icon: Calendar },
    { number: '20+', label: 'Tamamlanan Proje', icon: Rocket },
    { number: '1000+', label: 'Forum Tartışması', icon: MessageSquare },
  ]

  return (
    <section id="stats" className="relative py-20 md:py-28 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('/selcukk.jpeg')"}}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Topluluğumuzun Gücü</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 p-6 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-opacity-20 hover:scale-105 cursor-pointer"
            >
              <div>
                <span className="text-4xl font-bold block mb-2 text-white">{stat.number}</span>
                <span className="text-white text-opacity-80">{stat.label}</span>
              </div>
              <stat.icon className="h-12 w-12 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
