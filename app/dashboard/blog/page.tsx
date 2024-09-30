"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createBlogPost, getBlogPosts, updateBlogPost, BlogPostData } from '@/services/api';
import { toast } from 'react-toastify';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const Blog: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [readTime, setReadTime] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [existingPosts, setExistingPosts] = useState<BlogPostData[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchExistingPosts();
  }, []);

  const fetchExistingPosts = async () => {
    try {
      const response = await getBlogPosts();
      setExistingPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Blog gönderileri yüklenirken bir hata oluştu.');
    }
  };

  const handleCategoryAdd = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content);
    formData.append('categories', JSON.stringify(categories));
    formData.append('date', new Date().toISOString());
    formData.append('viewsCount', editingPost ? editingPost.viewsCount.toString() : '0');
    formData.append('author', 'Admin'); // This should be replaced with the actual logged-in user
    formData.append('isFeatured', isFeatured.toString());
    formData.append('readTime', readTime.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingPost) {
        await updateBlogPost(editingPost._id, formData);
        toast.success('Blog gönderisi başarıyla güncellendi!');
      } else {
        await createBlogPost(formData);
        toast.success('Blog gönderisi başarıyla oluşturuldu!');
      }
      resetForm();
      fetchExistingPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Blog gönderisi kaydedilirken bir hata oluştu.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setImage(null);
    setImagePreview('');
    setContent('');
    setCategories([]);
    setReadTime(0);
    setIsFeatured(false);
    setEditingPost(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (post: BlogPostData) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setImagePreview(post.imageUrl);
    setContent(post.content);
    setCategories(post.categories);
    setReadTime(post.readTime);
    setIsFeatured(post.isFeatured);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
        {editingPost ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Oluştur'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6 max-w-3xl mx-auto">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Kısa Açıklama</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Görsel</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            accept="image/*"
            ref={fileInputRef}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 max-w-full h-auto" />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">İçerik</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white border border-gray-300 rounded-md text-gray-900"
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
              className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
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

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Okuma Süresi (dakika)</label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Öne Çıkan Gönderi</label>
        </div>

        <button type="submit" className="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 transition duration-300 text-lg font-semibold">
          {editingPost ? 'Güncelle' : 'Yayınla'}
        </button>

        {editingPost && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 text-gray-700 p-3 rounded-md w-full hover:bg-gray-400 transition duration-300 text-lg font-semibold mt-2"
          >
            İptal
          </button>
        )}
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Mevcut Blog Gönderileri</h2>
        <ul className="space-y-4">
          {existingPosts.map((post) => (
            <li key={post._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Düzenle
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Blog;