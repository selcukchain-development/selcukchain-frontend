"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Blockchain Teknolojisinin Geleceği',
    excerpt: 'Blockchain teknolojisinin önümüzdeki yıllarda nasıl gelişeceğini ve hangi sektörleri etkileyeceğini inceliyoruz.',
    imageUrl: '/blog2.png',
    date: '15 Mayıs 2023',
    author: 'Ahmet Yılmaz',
    content: '',
    categories: ['Teknoloji', 'Blockchain'],
    viewsCount: 120,
    isFeatured: true,
    readTime: 5,
  },
  {
    id: '2',
    title: 'Kripto Para Birimleri ve Ekonomik Etkileri',
    excerpt: 'Kripto para birimlerinin global ekonomi üzerindeki potansiyel etkilerini ve gelecekteki rolünü ele alıyoruz.',
    imageUrl: '/blog1.png',
    date: '22 Mayıs 2023',
    author: 'Mehmet Demir',
    content: '',
    categories: ['Ekonomi', 'Kripto'],
    viewsCount: 150,
    isFeatured: false,
    readTime: 4,
  },
  {
    id: '3',
    title: 'Akıllı Kontratların İş Dünyasındaki Uygulamaları',
    excerpt: 'Akıllı kontratların farklı sektörlerde nasıl kullanılabileceğini ve sağlayacağı avantajları inceliyoruz.',
    imageUrl: '/blog3.png',
    date: '29 Mayıs 2023',
    author: 'Ayşe Kaya',
    content: '',
    categories: ['Teknoloji', 'Akıllı Kontratlar'],
    viewsCount: 90,
    isFeatured: false,
    readTime: 6,
  },
  // Diğer blog gönderileri (örnek olarak)
  {
    id: '4',
    title: 'Yeni Nesil Web Teknolojileri',
    excerpt: 'Web teknolojilerindeki son gelişmeler ve trendler.',
    imageUrl: '/blog4.png',
    date: '10 Temmuz 2023',
    author: 'Selin Öztürk',
    content: '',
    categories: ['Web', 'Teknoloji'],
    viewsCount: 80,
    isFeatured: false,
    readTime: 3,
  },
  {
    id: '5',
    title: 'Veri Güvenliği ve Gizlilik',
    excerpt: 'Veri güvenliği konusunda bilinmesi gerekenler.',
    imageUrl: '/blog5.png',
    date: '20 Temmuz 2023',
    author: 'Ali Veli',
    content: '',
    categories: ['Güvenlik', 'Veri'],
    viewsCount: 70,
    isFeatured: false,
    readTime: 4,
  },
];

const BlogPage: React.FC = () => {
  const [latestPost, ...otherPosts] = blogPosts;
  const router = useRouter();

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Son Blog Yazıları
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Topluluk üyelerimizin paylaştığı yazıları buradan okuyabilirsiniz.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol taraf - En güncel blog postu */}
            <motion.article 
              className="relative h-96 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => handlePostClick(latestPost.id)}
            >
              <Image 
                src={latestPost.imageUrl} 
                alt={latestPost.title} 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 hover:bg-opacity-50">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-white">{latestPost.title}</h3>
                  <p className="text-gray-200 mb-4">{latestPost.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{latestPost.date} | {latestPost.author}</span>
                    <span className="text-blue-300 hover:text-blue-100 font-medium transition-colors duration-300">
                      Devamını Oku
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sağ taraf - İki blog postu */}
            <div className="space-y-8">
              {otherPosts.slice(0, 2).map((post, index) => (
                <motion.article 
                  key={post.id} 
                  className="relative h-[11rem] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    layout="fill" 
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 hover:bg-opacity-50">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                      <p className="text-gray-200 mb-2 text-sm">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{post.date} | {post.author}</span>
                        <span className="text-blue-300 hover:text-blue-100 font-medium text-sm transition-colors duration-300">
                          Devamını Oku
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Diğer blog gönderileri için yatay kartlar */}
          <div className="mt-12 space-y-8">
            {otherPosts.slice(2).map((post) => (
              <motion.article 
                key={post.id} 
                className="relative w-full h-48 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handlePostClick(post.id)}
              >
                <Image 
                  src={post.imageUrl} 
                  alt={post.title} 
                  layout="fill" 
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 hover:bg-opacity-50">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold mb-1 text-white">{post.title}</h3>
                    <p className="text-gray-200 mb-2 text-sm">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">{post.date} | {post.author}</span>
                      <span className="text-blue-300 hover:text-blue-100 font-medium text-sm transition-colors duration-300">
                        Devamını Oku
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
