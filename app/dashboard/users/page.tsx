"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, User, Mail, Phone, GraduationCap } from "lucide-react"
import { getAllJoins, JoinData } from '@/services/api'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersPage() {
  const [joins, setJoins] = useState<JoinData[]>([])
  const roles = {
    designer: "Tasarımcı",
    developer: "Geliştirici",
    social_media: "Sosyal Medya",
    community_manager: "Topluluk Yöneticisi",
    marketing: "Pazarlama",
  }

  useEffect(() => {
    const fetchJoins = async () => {
      try {
        const response = await getAllJoins();
        console.log('API response:', response);
        if (Array.isArray(response.data.data)) {
          setJoins(response.data.data);
        } else {
          console.error('Unexpected data structure:', response.data);
        }
      } catch (error) {
        console.error("Error fetching joins:", error);
      }
    };

    fetchJoins();
  }, []);

  useEffect(() => {
    console.log('Join data state:', joins.map(join => join?.firstName));
  }, [joins]);

  return (
    <div className="p-6 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Users className="h-8 w-8 mr-3 text-blue-500" />
        <h1 className="text-3xl font-bold text-black">Üyeler</h1>
      </motion.div>
      
      <div className="flex flex-wrap gap-6">
        {joins.map((data, index) => (
          <Card key={index} className="w-full max-w-sm bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                {data.firstName} {data.lastName}
              </CardTitle>
              <Badge variant="outline" className="bg-gray-200 text-black">{roles[data.role as keyof typeof roles]}</Badge>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span className="text-sm">{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span className="text-sm">{data.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 opacity-70" />
                <span className="text-sm">{data.school} - {data.class}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Blockchain</h4>
                <Badge variant="outline" className="bg-gray-200 text-black">{data.blockchain}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">İlgi Alanları</h4>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-200 text-black">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
