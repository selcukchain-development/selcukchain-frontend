"use client";
    
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getBlogPosts, BlogPostData } from '@/services/api';
import { toast } from 'react-toastify';
import { CldImage } from 'next-cloudinary';

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

  const [latestPost, ...otherPosts] = blogPosts;

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

          {blogPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sol taraf - En güncel blog postu */}
                <motion.article 
                  className="relative h-96 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => handlePostClick(latestPost._id)}
                >
                  <CldImage 
                    src={latestPost.imageUrl} 
                    alt={latestPost.title} 
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 hover:bg-opacity-50">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-white">{latestPost.title}</h3>
                      <p className="text-gray-200 mb-4">{latestPost.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{new Date(latestPost.date).toLocaleDateString()} | {latestPost.author}</span>
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
                      key={post._id} 
                      className="relative h-[11rem] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      onClick={() => handlePostClick(post._id)}
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
                            <span className="text-sm text-gray-300">{new Date(post.date).toLocaleDateString()} | {post.author}</span>
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
                    key={post._id} 
                    className="relative w-full h-48 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handlePostClick(post._id)}
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
                          <span className="text-sm text-gray-300">{new Date(post.date).toLocaleDateString()} | {post.author}</span>
                          <span className="text-blue-300 hover:text-blue-100 font-medium text-sm transition-colors duration-300">
                            Devamını Oku
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-300">Henüz blog gönderisi bulunmamaktadır.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;