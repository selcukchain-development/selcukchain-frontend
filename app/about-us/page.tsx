"use client"

import { motion } from "framer-motion"
import { Users, Lightbulb, Rocket, Globe } from "lucide-react"
import Image from 'next/image'

export default function AboutUs() {
  const missions = [
    { icon: Users, title: 'Topluluk Oluşturma', description: 'Blockchain tutkunlarını bir araya getirerek güçlü bir ağ oluşturuyoruz.' },
    { icon: Lightbulb, title: 'Eğitim ve Gelişim', description: 'Üyelerimize blockchain teknolojisi hakkında kapsamlı eğitimler sunuyoruz.' },
    { icon: Rocket, title: 'İnovasyon', description: 'Yenilikçi blockchain projelerini destekliyor ve geliştiriyoruz.' },
    { icon: Globe, title: 'Farkındalık', description: 'Blockchain teknolojisinin potansiyelini topluma anlatıyoruz.' },
  ]

  return (
    <section id="about" className="bg-black text-white py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SelcukChain Hakkında
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Blockchain teknolojisini öğrenmek, geliştirmek ve yaymak için bir araya gelen tutkulu bir topluluğuz.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/selcukk.jpeg"
              alt="SelcukChain Topluluğu"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Vizyonumuz</h3>
            <p className="text-gray-300 mb-6">
              SelcukChain olarak, blockchain teknolojisinin potansiyelini keşfetmek ve bu teknolojiyi toplumun her kesimine ulaştırmak için çalışıyoruz. Amacımız, Türkiye&apos;de blockchain ekosisteminin gelişimine öncülük etmek ve global blockchain topluluğunda söz sahibi olmaktır.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Misyonumuz</h3>
            <p className="text-gray-300">
              Blockchain teknolojisi konusunda farkındalık yaratmak, eğitimler düzenlemek, projeler geliştirmek ve sektördeki yenilikleri takip ederek üyelerimizin ve toplumumuzun bu alandaki bilgi ve becerilerini artırmaktır.
            </p>
          </motion.div>
        </div>

        <h3 className="text-3xl font-semibold mb-8 text-center text-blue-400">Neler Yapıyoruz?</h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {missions.map((mission, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <mission.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-white">{mission.title}</h4>
              <p className="text-gray-300 text-center">{mission.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
