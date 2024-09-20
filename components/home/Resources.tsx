import { Button } from "@/components/ui/button"
import { ChevronRight, Book, MessageCircleCode, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function Resources() {
  const resources = [
    {
      title: 'Topluluk Kütüphanesi',
      description: 'Üyelerimizin paylaştığı makaleler, araştırmalar ve kaynaklar',
      link: '#',
      icon: Book,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Proje Atölyesi',
      description: 'Topluluk projelerimiz için kullandığımız araçlar ve kaynaklar',
      link: '#',
      icon: MessageCircleCode,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Tartışma Forumları',
      description: 'Blockchain konularında fikir alışverişi yapın ve sorularınızı sorun',
      link: '#',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <section id="resources" className="bg-white py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Topluluk Kaynakları
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Blockchain yolculuğunuzda size destek olacak araçlar
        </motion.p>
        <div className="grid gap-8 md:grid-cols-3">
          {resources.map((resource, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${resource.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="flex items-center mb-4">
                <resource.icon className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
              </div>
              <p className="text-white text-opacity-90 mb-6">{resource.description}</p>
              <Button variant="secondary" className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300" asChild>
                <a href={resource.link}>
                  Keşfet <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
