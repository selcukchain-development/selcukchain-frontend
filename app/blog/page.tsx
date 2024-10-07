"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getBlogPosts, BlogPostData } from '@/services/api';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Share2, Calendar, MessageCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getBlogPosts();
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Blog gönderileri yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Yükleniyor...</div>;
  }

  const categories = [
    { name: "Kripto Paralar", color: "bg-pink-500" },
    { name: "Blockchain", color: "bg-blue-500" },
    { name: "DeFi", color: "bg-purple-500" },
    { name: "NFT", color: "bg-green-500" },
    { name: "Metaverse", color: "bg-yellow-500" },
    { name: "Web3", color: "bg-red-500" },
  ];

  const featuredPosts = [
    { title: "NFT'lerin Geleceği: Sanat ve Teknolojinin Kesişimi", author: "Mehmet Kaya", date: "12 Mar" },
    { title: "DeFi Protokolleri: Finansın Geleceği mi?", author: "Zeynep Şahin", date: "10 Mar" },
    { title: "Metaverse: Sanal Dünyanın Yeni Yüzü", author: "Can Yılmaz", date: "8 Mar" },
  ];

  return (
    <motion.div className="container mx-auto py-12 max-w-6xl">
      <section className="py-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Son Blog Yazıları
        </motion.h2>

        <motion.p
          className="text-lg text-center text-gray-300 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Bu sayfa, kripto para, blockchain, DeFi, NFT, metaverse ve Web3 gibi konularda en güncel ve ilgi çekici blog yazılarını sunmaktadır. Burada, alanında uzman yazarların makalelerini okuyabilir, yeni gelişmeleri takip edebilir ve dijital dünyanın geleceği hakkında bilgi edinebilirsiniz. Kategorilere göz atarak ilgilendiğiniz konulara kolayca ulaşabilir, öne çıkan blogları inceleyerek popüler içerikleri keşfedebilirsiniz.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12 ">
          <div className="lg:w-2/3 space-y-10">
            {blogPosts.length > 0 ? (
           blogPosts.map((post, index) => (
            <div 
              key={post._id} 
              className={`flex flex-col md:flex-row items-stretch bg-[#00000058] p-6 overflow-hidden ${index !== 0 ? 'border-t border-gray-300 pt-10' : ''} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="flex-1 pr-8" onClick={() => handlePostClick(post._id)}>
                <div className="mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={post.authorImage || ''} alt={post.author} />
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{post.author}</p>
                      <p className="text-sm text-gray-400">{post.readTime}</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
                </div>
                <div className="mb-4">
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                      {new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                    </span>
                    <span>·</span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      {post.likeCount || 0}
                    </span>
                    <span>·</span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1 text-green-500" />
                      {post.commentCount || 0} 
                    </span>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <Button className='hover:bg-red-50 bg-transparent' size="icon">
                      <Heart className="h-4 w-4 hover:text-red-500" />
                    </Button>
                    <Button className='hover:bg-blue-50 bg-transparent' size="icon">
                      <Bookmark className="h-4 w-4 hover:text-blue-500" />
                    </Button>
                    <Button className='hover:bg-green-50 bg-transparent' size="icon">
                      <Share2 className="h-4 w-4 hover:text-green-500" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 flex items-stretch">
                <div className="relative w-full h-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))
          
            
            ) : (
              <p className="text-center text-gray-300">Henüz blog gönderisi bulunmamaktadır.</p>
            )}
          </div>

          <div className="lg:w-1/3 space-y-10 bg-[#00000058] p-4">
            <div className="overflow-hidden border-b border-gray-700 pb-6">
              <h3 className="text-xl font-bold pb-4 mb-4 border-b border-gray-700">Kategoriler</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <Badge key={index} className={`bg-gray-700 text-white hover:bg-blue-500 cursor-pointer transition-colors px-3 py-1 text-sm font-medium`}>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="overflow-hidden ">
              <h3 className="text-xl font-bold pb-4 mb-4 border-b border-gray-700">Öne Çıkan Bloglar</h3>
              <ul className="space-y-6">
                {featuredPosts.map((post, index) => (
                  <li key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium mb-2 text-gray-200 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h4>
                    <p className="text-sm text-gray-400">{post.author} · {post.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
