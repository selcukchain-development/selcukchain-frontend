"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookmarkPlus, Clock, Eye, Heart, MessageCircle, Share2 } from "lucide-react"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  content: string;
  categories: string[];
  viewsCount: number;
  isFeatured: boolean;
  readTime: number;
  updatedDate?: string;
}

// Bu örnek veri yapısı, gerçek uygulamada API'den gelecektir
const blogPost: BlogPost = {
  id: "1",
  title: "Blockchain Teknolojisinin Geleceği: 2024 ve Ötesi",
  excerpt: "Blockchain'in önümüzdeki yıllarda nasıl evrimleşeceğini ve hangi endüstrileri dönüştüreceğini keşfedin.",
  imageUrl: '/blog2.png',
  date: "15 Mart 2024",
  author: "Ayşe Yılmaz",
  content: `
    <p>Blockchain teknolojisi, son yıllarda finans dünyasından tedarik zincirine, sağlık hizmetlerinden sanat dünyasına kadar pek çok alanı derinden etkiledi. Peki ya gelecekte bizi neler bekliyor? İşte blockchain'in 2024 ve sonrasında şekillendireceği bazı alanlar:</p>

    <h2>1. Merkeziyetsiz Finans (DeFi) 2.0</h2>
    <p>DeFi, geleneksel finansal sistemleri alt üst etmeye devam ediyor. Önümüzdeki yıllarda, daha kullanıcı dostu arayüzler, gelişmiş güvenlik protokolleri ve gerçek dünya varlıklarının tokenizasyonu ile DeFi'nin daha da yaygınlaşması bekleniyor.</p>

    <h2>2. Sürdürülebilir Blockchain Çözümleri</h2>
    <p>Enerji tüketimi konusundaki endişeler, daha çevre dostu konsensüs mekanizmalarının geliştirilmesine yol açıyor. Proof of Stake (PoS) ve diğer alternatif yöntemler, blockchain'in karbon ayak izini azaltmada önemli rol oynayacak.</p>

    <h2>3. Nesnelerin İnterneti (IoT) ve Blockchain Entegrasyonu</h2>
    <p>Blockchain, IoT cihazları arasındaki veri alışverişini güvenli ve şeffaf hale getirerek, akıllı şehirlerden tarıma kadar birçok alanda devrim yaratacak potansiyele sahip.</p>

    <h2>4. Dijital Kimlik Çözümleri</h2>
    <p>Blockchain tabanlı dijital kimlik sistemleri, kişisel verilerin kontrolünü kullanıcılara vererek, daha güvenli ve özel bir dijital dünya vaat ediyor.</p>

    <p>Sonuç olarak, blockchain teknolojisi sadece kripto para birimlerinin ötesinde, toplumun her alanında köklü değişiklikler yaratma potansiyeline sahip. Önümüzdeki yıllar, bu teknolojinin gerçek dünya uygulamalarının artışına ve olgunlaşmasına tanık olacak.</p>
  `,
  categories: ["Blockchain", "Teknoloji", "Gelecek"],
  viewsCount: 1520,
  isFeatured: true,
  readTime: 7,
  updatedDate: "18 Mart 2024"
}

export default function BlogDetailPage() {
  const [likes, setLikes] = useState(128)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-64">
          <Image 
            src={blogPost.imageUrl} 
            alt={blogPost.title} 
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={blogPost.author} />
                <AvatarFallback>{blogPost.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">{blogPost.author}</p>
                <p className="text-sm text-gray-400">{blogPost.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{blogPost.readTime} dk okuma</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-white">{blogPost.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.categories.map((category, index) => (
              <Badge key={index} variant="secondary">{category}</Badge>
            ))}
          </div>

          <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

          <Separator className="my-8" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleLike}>
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                {likes}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Yorum Yap
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </article>

      <Card className="max-w-4xl mx-auto mt-8 bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Eye className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">{blogPost.viewsCount} görüntülenme</span>
            </div>
            {blogPost.updatedDate && (
              <div className="text-sm text-gray-400">
                Son güncelleme: {blogPost.updatedDate}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}