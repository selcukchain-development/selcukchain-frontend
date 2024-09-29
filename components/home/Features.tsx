import { Users, Lightbulb, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export function Features() {
  const features = [
    { 
      icon: Users, 
      title: 'Aktif Topluluk', 
      description: "Blockchain tutkunlarıyla tanışın, fikir alışverişinde bulunun ve birlikte projeler geliştirin." 
    },
    { 
      icon: Lightbulb, 
      title: 'Bilgi Paylaşımı', 
      description: "Düzenli buluşmalar, webinarlar ve çalışma gruplarıyla bilgi ve deneyimlerinizi paylaşın." 
    },
    { 
      icon: Rocket, 
      title: 'İnovasyon Fırsatları', 
      description: 'Yenilikçi blockchain projelerinde yer alın, fikirlerinizi hayata geçirin.' 
    },
  ]

  return (
    <section id="features" className="bg-background py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">SelcukChain&apos;de Sizi Neler Bekliyor?</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl text-gray-700 font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
