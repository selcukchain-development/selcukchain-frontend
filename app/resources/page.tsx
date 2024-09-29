"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Code, FileText, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
    {
      title: 'Blockchain Temelleri',
      description: 'Blockchain teknolojisinin temellerini öğrenin',
      icon: Book,
      content: [
        { 
          title: 'Blockchain Nedir?', 
          details: 'Blockchain, verilerin şifrelenmiş bir şekilde birbirine bağlı bloklarda saklandığı dağıtık bir veri yapısıdır. Her blok, önceki bloğun özet değerini içerir, bu da verilerin değiştirilmesini zorlaştırır ve güvenliği artırır.'
        },
        { 
          title: 'Konsensus Mekanizmaları', 
          details: 'Konsensus mekanizmaları, ağdaki tüm düğümlerin blockchain\'in durumu üzerinde anlaşmasını sağlar. Proof of Work (PoW), Proof of Stake (PoS) ve Delegated Proof of Stake (DPoS) en yaygın konsensus mekanizmalarıdır.'
        },
        { 
          title: 'Kriptografi ve Hash Fonksiyonları', 
          details: 'Blockchain\'de kriptografi, verilerin güvenliğini sağlamak için kullanılır. Hash fonksiyonları, büyük veri kümelerini sabit uzunlukta benzersiz değerlere dönüştürür ve blockchain\'in bütünlüğünü korur.'
        },
      ]
    },
    {
      title: 'Akıllı Sözleşmeler',
      description: 'Akıllı sözleşme geliştirme dünyasına dalın',
      icon: Code,
      content: [
        { 
          title: 'Solidity\'ye Giriş', 
          details: 'Solidity, Ethereum blockchain\'i üzerinde akıllı sözleşmeler yazmak için kullanılan nesne yönelimli bir programlama dilidir. Syntax\'ı JavaScript\'e benzer ve statik olarak yazılmıştır.'
        },
        { 
          title: 'İlk Akıllı Sözleşmenizi Yazın', 
          details: 'Basit bir akıllı sözleşme örneği: Token oluşturma, transfer fonksiyonları ve bakiye sorgulama gibi temel işlevleri içeren bir ERC-20 token sözleşmesi.'
        },
        { 
          title: 'Akıllı Sözleşme Güvenliği', 
          details: 'Akıllı sözleşme güvenliği kritik öneme sahiptir. Reentrancy saldırıları, integer overflow/underflow, ve gas limit sorunları gibi yaygın güvenlik açıklarından kaçınmak için best practice\'leri öğrenin.'
        },
      ]
    },
    {
      title: 'DeFi Protokolleri',
      description: 'Merkeziyetsiz finans protokollerini keşfedin',
      icon: FileText,
      content: [
        { 
          title: 'Likidite Havuzlarını Anlamak', 
          details: 'Likidite havuzları, kullanıcıların varlıklarını yatırdığı ve karşılığında ödül aldığı havuzlardır. Bu havuzlar, merkeziyetsiz borsaların ve lending platformlarının temelini oluşturur.'
        },
        { 
          title: 'Yield Farming Stratejileri', 
          details: 'Yield farming, kullanıcıların DeFi protokollerine likidite sağlayarak en yüksek getiriyi elde etmeye çalıştığı bir stratejidir. Farklı protokoller ve stratejiler arasında risk-ödül dengesini anlamak önemlidir.'
        },
        { 
          title: 'Merkeziyetsiz Borsalar (DEX)', 
          details: 'DEX\'ler, kullanıcıların aracı olmadan token takası yapmasına olanak tanır. Uniswap, SushiSwap ve PancakeSwap gibi popüler DEX\'lerin çalışma prensiplerini ve AMM (Automated Market Maker) modelini öğrenin.'
        },
      ]
    },
    {
      title: 'Blockchain Uygulamaları',
      description: 'Blockchain\'in çeşitli sektörlerdeki uygulamalarını öğrenin',
      icon: Layers,
      content: [
        { 
          title: 'Tedarik Zinciri Yönetimi', 
          details: 'Blockchain, ürünlerin üretimden tüketime kadar olan yolculuğunu şeffaf ve değiştirilemez bir şekilde takip etmeyi sağlar. Bu, sahtecilikle mücadele ve ürün kalitesinin artırılmasına yardımcı olur.'
        },
        { 
          title: 'Dijital Kimlik ve KYC', 
          details: 'Blockchain tabanlı dijital kimlik sistemleri, kullanıcıların kişisel verilerini güvenli bir şekilde saklamasına ve kontrol etmesine olanak tanır. Bu, KYC (Know Your Customer) süreçlerini hızlandırabilir ve veri gizliliğini artırabilir.'
        },
        { 
          title: 'NFT\'ler ve Dijital Sanat', 
          details: 'Non-Fungible Token\'lar (NFT\'ler), dijital varlıkların benzersizliğini ve sahipliğini blockchain üzerinde temsil eder. Sanat, müzik, oyun içi öğeler ve daha fazlası için kullanılabilir.'
        },
      ]
    },
  ]




export default function ResourcesPage() {
  const [activeResource, setActiveResource] = useState(resources[0].title)
  const [activeContent, setActiveContent] = useState(resources[0].content[0].title)

  return (
    <div className="bg-neutral-dark text-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Geliştirici Kaynakları
        </motion.h1>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <nav>
              {resources.map((resource) => (
                <div key={resource.title}>
                  <Button
                    variant={activeResource === resource.title ? "default" : "ghost"}
                    className={`w-full justify-start mb-2 ${activeResource === resource.title ? 'bg-primary text-white' : 'text-neutral-light'}`}
                    onClick={() => {
                      setActiveResource(resource.title)
                      setActiveContent(resource.content[0].title)
                    }}
                  >
                    <resource.icon className="mr-2 h-4 w-4 text-accent" />
                    {resource.title}
                  </Button>
                  {activeResource === resource.title && (
                    <div className="ml-4 space-y-1">
                      {resource.content.map((item) => (
                        <Button
                          key={item.title}
                          variant={activeContent === item.title ? "default" : "ghost"}
                          size="sm"
                          className={`w-full justify-start ${activeContent === item.title ? 'bg-primary text-white' : 'text-neutral-light'}`}
                          onClick={() => setActiveContent(item.title)}
                        >
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="md:col-span-3">
            {resources.map((resource) => (
              resource.content.map((item) => (
                <motion.div
                  key={`${resource.title}-${item.title}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeResource === resource.title && activeContent === item.title ? 1 : 0,
                    x: activeResource === resource.title && activeContent === item.title ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${activeResource === resource.title && activeContent === item.title ? 'block' : 'hidden'}`}
                >
                  <h2 className="text-2xl font-semibold mb-4 text-primary">{item.title}</h2>
                  <p className="text-neutral-light">{item.details}</p>
                </motion.div>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
