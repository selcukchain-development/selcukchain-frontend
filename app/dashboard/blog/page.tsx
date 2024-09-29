"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// React Quill için dinamik import
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const Blog: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleCategoryAdd = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title,
      excerpt,
      imageUrl,
      content,
      categories,
      date: new Date().toLocaleDateString(),
      viewsCount: 0,
      author: 'Kullanıcı Adı',
    };
    console.log('Yeni Blog Yazısı:', newPost);
    // API çağrısı burada yapılabilir

    // Formu temizle
    setTitle('');
    setExcerpt('');
    setImageUrl('');
    setContent('');
    setCategories([]);
    setNewCategory('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Yeni Blog Yazısı Oluştur</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6 max-w-3xl mx-auto">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Kısa Açıklama</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Görsel URL&apos;si</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">İçerik</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white border border-gray-300 rounded-md"
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean'],
              ],
            }}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Kategoriler</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Yeni kategori ekle"
            />
            <button
              type="button"
              onClick={handleCategoryAdd}
              className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Ekle
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 transition duration-300 text-lg font-semibold">
          Yayınla
        </button>
      </form>
    </motion.div>
  );
};

export default Blog;
