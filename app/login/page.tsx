'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { login } from '@/services/api'
import { Lock, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(email, password)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        router.push('/dashboard')
      } else {
        setLoading(false)
        setError('Only admin users are allowed')
      }
    } catch (error) {
      setLoading(false)
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-dark">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center text-primary-dark">Admin Giriş</CardTitle>
          <CardDescription className="text-center text-neutral-dark">
            Yönetici paneline giriş yapmak için bilgilerinizi giriniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-dark">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-neutral-light border border-neutral-dark text-neutral-dark focus:ring-primary focus:border-primary-light"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-neutral-dark">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-neutral-light border border-neutral-dark text-neutral-dark focus:ring-primary focus:border-primary-light"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
            {error && <p className="text-danger text-center mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
