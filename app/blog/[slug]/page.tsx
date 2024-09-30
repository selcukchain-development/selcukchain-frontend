"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookmarkPlus, Clock, Eye, Heart, MessageCircle, Share2 } from "lucide-react"
import { getBlogPost, BlogPostData } from '@/services/api'
import { toast } from 'react-toastify'

export default function BlogDetailPage() {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const { slug } = useParams()

  useEffect(() => {
    fetchBlogPost()
  }, [slug])

  const fetchBlogPost = async () => {
    try {
      setIsLoading(true)
      const response = await getBlogPost(slug as string)
      setBlogPost(response.data)
      setLikes(response.data.likes || 0)
    } catch (error) {
      console.error('Error fetching blog post:', error)
      toast.error('Blog gönderisi yüklenirken bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
    
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white">Yükleniyor...</p>
    </div>
  }

  if (!blogPost) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white">Blog gönderisi bulunamadı.</p>
    </div>
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
                <p className="text-sm text-gray-400">{new Date(blogPost.date).toLocaleDateString()}</p>
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
          
          </div>
        </CardContent>
      </Card>
    </div>
  )
}