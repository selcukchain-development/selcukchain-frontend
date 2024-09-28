'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"
import { Wallet, Coins, FileCode, Link } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

export default function BlockchainCommunityForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    blockchain: '',
    school: '',
    class: '',
    interests: [] as string[],
    role: '' 
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Form Gönderildi", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSubmitted(true);
      } else {
        throw new Error('Form gönderimi başarısız oldu.');
      }
    } catch (error:any) {
      toast.error("Bir hata oluştu: " + error.message);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-dark p-6">
        <div className="w-full max-w-3xl p-8 bg-neutral-light rounded-lg shadow-lg text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-primary-dark">Teşekkürler!</h2>
            <p className="text-lg text-neutral-dark mb-6">Başvurunuz alınmıştır. Topluluğumuza katıldığınız için teşekkür ederiz!</p>
            <Button onClick={() => setSubmitted(false)} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
              Geri Dön
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-dark p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 bg-neutral-light rounded-lg shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Bize Katıl</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-neutral-dark">Ad</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Adınızı girin"
                className="bg-neutral-light text-neutral-dark border border-neutral-dark focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-neutral-dark">Soyad</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Soyadınızı girin"
                className="bg-neutral-light text-neutral-dark border border-neutral-dark focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-neutral-dark">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="E-posta adresinizi girin"
                className="bg-neutral-light text-neutral-dark border border-neutral-dark focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-neutral-dark">Telefon Numarası</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Telefon numaranızı girin"
                className="bg-neutral-light text-neutral-dark border border-neutral-dark focus:border-primary"
              />
            </div>

            {/* Blockchain Bilgisi */}
            <div>
              <Label htmlFor="blockchain" className="text-neutral-dark">Blockchain Bilgisi</Label>
              <Select value={formData.blockchain} onValueChange={handleSelectChange('blockchain')}>
                <SelectTrigger id="blockchain" className="bg-neutral-light text-neutral-dark border border-neutral-dark">
                  <SelectValue placeholder="Blockchain bilginizi seçin" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-light text-neutral-dark">
                  <SelectItem value="beginner">Başlangıç</SelectItem>
                  <SelectItem value="intermediate">Orta</SelectItem>
                  <SelectItem value="advanced">İleri</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="school" className="text-neutral-dark">Okul</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                placeholder="Okulunuzu girin"
                className="bg-neutral-light text-neutral-dark border border-neutral-dark focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="class" className="text-neutral-dark">Sınıf</Label>
              <Select value={formData.class} onValueChange={handleSelectChange('class')}>
                <SelectTrigger id="class" className="bg-neutral-light text-neutral-dark border border-neutral-dark">
                  <SelectValue placeholder="Sınıfınızı seçin" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-light text-neutral-dark">
                  <SelectItem value="1">1. Sınıf</SelectItem>
                  <SelectItem value="2">2. Sınıf</SelectItem>
                  <SelectItem value="3">3. Sınıf</SelectItem>
                  <SelectItem value="4">4. Sınıf</SelectItem>
                  <SelectItem value="5+">5+ Sınıf</SelectItem>
                  <SelectItem value="graduate">Mezun</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Topluluktaki Rol */}
          <div>
            <Label htmlFor="role" className="text-neutral-dark">Topluluktaki Rolünüz</Label>
            <Select value={formData.role} onValueChange={handleSelectChange('role')}>
              <SelectTrigger id="role" className="bg-neutral-light text-neutral-dark border border-neutral-dark">
                <SelectValue placeholder="Topluluktaki rolünüzü seçin" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-light text-neutral-dark">
                <SelectItem value="designer">Tasarımcı</SelectItem>
                <SelectItem value="developer">Yazılımcı</SelectItem>
                <SelectItem value="social_media">Sosyal Medya Uzmanı</SelectItem>
                <SelectItem value="community_manager">Topluluk Yöneticisi</SelectItem>
                <SelectItem value="marketing">Pazarlama</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-neutral-dark">İlgi Alanları</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'DeFi', icon: <Wallet className="w-5 h-5 text-primary" /> },
                { name: 'NFTs', icon: <Coins className="w-5 h-5 text-secondary" /> },
                { name: 'Smart Contracts', icon: <FileCode className="w-5 h-5 text-accent" /> },
                { name: 'Cryptocurrency', icon: <Link className="w-5 h-5 text-accent-dark" /> }
              ].map((interest) => (
                <div key={interest.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.name}
                    checked={formData.interests.includes(interest.name)}
                    onCheckedChange={() => handleInterestChange(interest.name)}
                    className="text-primary"
                  />
                  <Label htmlFor={interest.name} className="text-neutral-dark flex items-center space-x-2">
                    {interest.icon}
                    <span>{interest.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white transition-transform transform hover:scale-105"
          >
            Topluluğa Katıl
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
