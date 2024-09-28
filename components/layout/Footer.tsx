import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Hakkımızda</h3>
            <p className="text-gray-400">SelcukChain: Merkeziyetsiz teknolojinin geleceğini eğitim, inovasyon ve topluluk aracılığıyla şekillendiriyoruz.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Kurslar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Kaynaklar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Bağlantılar</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Bülten</h3>
            <p className="text-gray-400 mb-4">En güncel haberlerden haberdar olun.</p>
            <form className="flex">
              <input type="email" placeholder="E-posta adresiniz" className="flex-grow px-4 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Button type="submit" className="rounded-l-none bg-blue-600 text-white hover:bg-blue-700">Abone Ol</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">© 2023 SelcukChain. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
