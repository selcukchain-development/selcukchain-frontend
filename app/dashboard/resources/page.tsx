"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Code, FileText, Layers, Plus, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ResourceContent {
  title: string
  details: string
}

interface Resource {
  title: string
  description: string
  icon: any
  content: ResourceContent[]
  color: string
}

const initialResources: Resource[] = [
  {
    title: 'Blockchain Temelleri',
    description: 'Blockchain teknolojisinin temellerini öğrenin',
    icon: Book,
    color: 'bg-blue-500',
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
    color: 'bg-green-500',
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
    color: 'bg-purple-500',
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
    color: 'bg-orange-500',
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

export default function ResourcesManagementPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [editingContent, setEditingContent] = useState<ResourceContent | null>(null)

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
  }

  const handleEditContent = (resource: Resource, content: ResourceContent) => {
    setEditingResource(resource)
    setEditingContent(content)
  }

  const handleDeleteResource = (resourceToDelete: Resource) => {
    setResources(resources.filter(resource => resource !== resourceToDelete))
  }

  const handleDeleteContent = (resourceToUpdate: Resource, contentToDelete: ResourceContent) => {
    const updatedResource = {
      ...resourceToUpdate,
      content: resourceToUpdate.content.filter(content => content !== contentToDelete)
    }
    setResources(resources.map(resource => 
      resource === resourceToUpdate ? updatedResource : resource
    ))
  }

  const handleSaveResource = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (editingResource) {
      const updatedResource: Resource = {
        ...editingResource,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      }

      setResources(resources.map(resource => 
        resource === editingResource ? updatedResource : resource
      ))
      setEditingResource(null)
    }
  }

  const handleSaveContent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (editingResource && editingContent) {
      const updatedContent: ResourceContent = {
        title: formData.get('title') as string,
        details: formData.get('details') as string,
      }

      const updatedResource = {
        ...editingResource,
        content: editingResource.content.map(content =>
          content === editingContent ? updatedContent : content
        )
      }

      setResources(resources.map(resource => 
        resource === editingResource ? updatedResource : resource
      ))
      setEditingResource(null)
      setEditingContent(null)
    }
  }

  return (
    <div className="p-6 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Developer Resources Yönetimi</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Yeni Kaynak Ekle
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className={`p-6 shadow-lg ${resource.color} text-white`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <resource.icon className="h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                </div>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => handleEditResource(resource)} className="text-white hover:bg-white hover:bg-opacity-20">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteResource(resource)} className="text-white hover:bg-white hover:bg-opacity-20">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm mb-4 text-white text-opacity-90">{resource.description}</p>
              <h4 className="font-semibold mb-2">İçerikler:</h4>
              {resource.content.map((content, contentIdx) => (
                <div key={contentIdx} className="mb-2 flex justify-between items-center bg-white bg-opacity-10 p-2 rounded">
                  <span>{content.title}</span>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => handleEditContent(resource, content)} className="text-white hover:bg-white hover:bg-opacity-20">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteContent(resource, content)} className="text-white hover:bg-white hover:bg-opacity-20">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
        ))}
      </div>

      {editingResource && !editingContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-2xl p-8 bg-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Kaynağı Düzenle</h2>
            <form onSubmit={handleSaveResource}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                <Input id="title" name="title" defaultValue={editingResource.title} className="w-full" placeholder="Başlık" />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <Textarea id="description" name="description" defaultValue={editingResource.description} className="w-full h-32" placeholder="Açıklama" />
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={() => setEditingResource(null)} className="mr-4">
                  İptal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Kaydet</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {editingResource && editingContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-2xl p-8 bg-gray-100 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">İçeriği Düzenle</h2>
            <form onSubmit={handleSaveContent}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-2">Başlık</label>
                <Input id="title" name="title" defaultValue={editingContent.title} className="w-full text-gray-900 bg-white" placeholder="Başlık" />
              </div>
              <div className="mb-6">
                <label htmlFor="details" className="block text-sm font-medium text-gray-800 mb-2">Detaylar</label>
                <Textarea id="details" name="details" defaultValue={editingContent.details} className="w-full h-48 text-gray-900 bg-white" placeholder="Detaylar" />
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={() => { setEditingResource(null); setEditingContent(null); }} className="mr-4 text-red-600 border-red-600 hover:bg-red-100">
                  İptal
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Kaydet</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
