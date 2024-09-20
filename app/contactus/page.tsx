"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.log(error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background to-gray-800 text-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          İletişime Geçin
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Bize Ulaşın</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Sorularınız, önerileriniz veya işbirliği fırsatları için bizimle iletişime geçmekten çekinmeyin. SelcukChain ekibi olarak size yardımcı olmaktan mutluluk duyarız.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-purple-400 mr-4" />
                <span className="text-gray-200">info@selcukchain.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-purple-400 mr-4" />
                <span className="text-gray-200">+90 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-purple-400 mr-4" />
                <span className="text-gray-200">Selçuk Üniversitesi, Konya, Türkiye</span>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Mesaj Gönderin</h2>
            <Input
              type="text"
              name="name"
              placeholder="Adınız"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
            />
            <Input
              type="email"
              name="email"
              placeholder="E-posta Adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
            />
            <Input
              type="text"
              name="subject"
              placeholder="Konu"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
            />
            <Textarea
              name="message"
              placeholder="Mesajınız"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 h-32"
            />
            <Button 
              type="submit" 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
            {submitStatus === 'success' && (
              <p className="text-green-400">Mesajınız başarıyla gönderildi!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400">Bir hata oluştu. Lütfen tekrar deneyin.</p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  )
}