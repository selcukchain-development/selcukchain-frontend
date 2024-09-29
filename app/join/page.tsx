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
import { createJoin, JoinData } from '@/services/api';

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
    e.preventDefault();
    try {
      const response = await createJoin(formData as JoinData);
      if (response.data.success) {
        toast.success("Form Gönderildi");
        setSubmitted(true);
      } else {
        throw new Error('Form gönderimi başarısız oldu.');
      }
    } catch (error: any) {
      toast.error("Bir hata oluştu: " + error.message);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-3xl p-8 bg-card rounded-lg shadow-lg text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-primary-dark">Teşekkürler!</h2>
            <p className="text-lg text-muted-foreground mb-6">Başvurunuz alınmıştır. Topluluğumuza katıldığınız için teşekkür ederiz!</p>
            <Button onClick={() => setSubmitted(false)} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
              Geri Dön
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 bg-card rounded-lg shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Bize Katıl</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-muted-foreground">Ad</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Adınızı girin"
                className="bg-card text-muted-foreground border border-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-muted-foreground">Soyad</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Soyadınızı girin"
                className="bg-card text-muted-foreground border border-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-muted-foreground">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="E-posta adresinizi girin"
                className="bg-card text-muted-foreground border border-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-muted-foreground">Telefon Numarası</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Telefon numaranızı girin"
                className="bg-card text-muted-foreground border border-muted-foreground focus:border-primary"
              />
            </div>

            {/* Blockchain Bilgisi */}
            <div>
              <Label htmlFor="blockchain" className="text-muted-foreground">Blockchain Bilgisi</Label>
              <Select value={formData.blockchain} onValueChange={handleSelectChange('blockchain')}>
                <SelectTrigger id="blockchain" className="bg-card text-muted-foreground border border-muted-foreground">
                  <SelectValue placeholder="Blockchain bilginizi seçin" />
                </SelectTrigger>
                <SelectContent className="bg-card text-muted-foreground">
                  <SelectItem value="beginner">Başlangıç</SelectItem>
                  <SelectItem value="intermediate">Orta</SelectItem>
                  <SelectItem value="advanced">İleri</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="school" className="text-muted-foreground">Okul</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                placeholder="Okulunuzu girin"
                className="bg-card text-muted-foreground border border-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="class" className="text-muted-foreground">Sınıf</Label>
              <Select value={formData.class} onValueChange={handleSelectChange('class')}>
                <SelectTrigger id="class" className="bg-card text-muted-foreground border border-muted-foreground">
                  <SelectValue placeholder="Sınıfınızı seçin" />
                </SelectTrigger>
                <SelectContent className="bg-card text-muted-foreground">
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
            <Label htmlFor="role" className="text-muted-foreground">Topluluktaki Rolünüz</Label>
            <Select value={formData.role} onValueChange={handleSelectChange('role')}>
              <SelectTrigger id="role" className="bg-card text-muted-foreground border border-muted-foreground">
                <SelectValue placeholder="Topluluktaki rolünüzü seçin" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem value="designer">Tasarımcı</SelectItem>
                <SelectItem value="developer">Yazılımcı</SelectItem>
                <SelectItem value="social_media">Sosyal Medya Uzmanı</SelectItem>
                <SelectItem value="community_manager">Topluluk Yöneticisi</SelectItem>
                <SelectItem value="marketing">Pazarlama</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-muted-foreground">İlgi Alanları</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'DeFi', icon: <Wallet className="w-5 h-5 text-primary" /> },
                { name: 'NFTs', icon: <Coins className="w-5 h-5 text-secondary" /> },
                { name: 'Smart Contracts', icon: <FileCode className="w-5 h-5 text-accent" /> },
                { name: 'Cryptocurrency', icon: <Link className="w-5 h-5 text-accent" /> }
              ].map((interest) => (
                <div key={interest.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.name}
                    checked={formData.interests.includes(interest.name)}
                    onCheckedChange={() => handleInterestChange(interest.name)}
                    className="text-primary"
                  />
                  <Label htmlFor={interest.name} className="text-muted-foreground flex items-center space-x-2">
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
