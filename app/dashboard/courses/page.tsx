"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { BookOpen, MessageCircleCode, MessageCircle, Plus, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'

interface Course {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: 'BookOpen' | 'MessageCircleCode' | 'MessageCircle';
  color: string;
  image: string;
}

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Topluluk Kütüphanesi',
    description: 'Üyelerimizin paylaştığı makaleler, araştırmalar ve kaynaklar',
    link: '#',
    icon: 'BookOpen',
    color: 'from-blue-500 to-blue-600',
    image: '/images/community-library.jpg',
  },
  {
    id: '2',
    title: 'Proje Atölyesi',
    description: 'Topluluk projelerimiz için kullandığımız araçlar ve kaynaklar',
    link: '#',
    icon: 'MessageCircleCode',
    color: 'from-green-500 to-green-600',
    image: '/images/project-workshop.jpg',
  },
  {
    id: '3',
    title: 'Tartışma Forumları',
    description: 'Blockchain konularında fikir alışverişi yapın ve sorularınızı sorun',
    link: '#',
    icon: 'MessageCircle',
    color: 'from-purple-500 to-purple-600',
    image: '/images/discussion-forums.jpg',
  },
]

const iconOptions = [
  { value: 'BookOpen', label: 'Book' },
  { value: 'MessageCircleCode', label: 'Code' },
  { value: 'MessageCircle', label: 'Forum' },
]

const colorOptions = [
  { value: 'from-blue-500 to-blue-600', label: 'Blue' },
  { value: 'from-green-500 to-green-600', label: 'Green' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple' },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const handleAddCourse = (course: Course) => {
    setCourses([...courses, { ...course, id: Date.now().toString() }])
  }

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course))
    setEditingCourse(null)
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const IconComponent = ({ icon }: { icon: Course['icon'] }) => {
    switch (icon) {
      case 'BookOpen':
        return <BookOpen className="h-6 w-6" />
      case 'MessageCircleCode':
        return <MessageCircleCode className="h-6 w-6" />
      case 'MessageCircle':
        return <MessageCircle className="h-6 w-6" />
    }
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <BookOpen className="h-8 w-8 mr-3 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-800">Kurslar</h1>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className={`bg-gradient-to-br ${course.color}`}>
            <CardContent className="p-6">
              <div className="relative w-full h-40 mb-4">
                <Image 
                  src={course.image} 
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="flex items-center mb-4">
                <IconComponent icon={course.icon} />
                <h3 className="text-xl font-semibold text-white ml-3">{course.title}</h3>
              </div>
              <p className="text-white text-opacity-90 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <Button variant="secondary" size="sm" asChild>
                  <a href={course.link} target="_blank" rel="noopener noreferrer">Keşfet</a>
                </Button>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => setEditingCourse(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{editingCourse ? 'Kursu Düzenle' : 'Yeni Kurs Ekle'}</CardTitle>
        </CardHeader>
        <CardContent className="bg-gray-100 p-6 rounded-lg">
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const courseData = {
              id: editingCourse?.id || '',
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              link: formData.get('link') as string,
              icon: formData.get('icon') as Course['icon'],
              color: formData.get('color') as string,
              image: formData.get('image') as string,
            }
            if (editingCourse) {
              handleUpdateCourse(courseData)
            } else {
              handleAddCourse(courseData)
            }
            e.currentTarget.reset()
          }}>
            <div className="space-y-4">
              <Input name="title" placeholder="Kurs Başlığı" defaultValue={editingCourse?.title} required className="bg-white text-gray-800" />
              <Textarea name="description" placeholder="Kurs Açıklaması" defaultValue={editingCourse?.description} required className="bg-white text-gray-800" />
              <Input name="link" placeholder="Kurs Linki" defaultValue={editingCourse?.link} required className="bg-white text-gray-800" />
              <Input name="image" placeholder="Resim URL'si" defaultValue={editingCourse?.image} required className="bg-white text-gray-800" />
              <Select name="icon" defaultValue={editingCourse?.icon}>
                <SelectTrigger className="bg-white text-gray-800">
                  <SelectValue placeholder="İkon Seç" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-gray-800">{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="color" defaultValue={editingCourse?.color}>
                <SelectTrigger className="bg-white text-gray-800">
                  <SelectValue placeholder="Renk Seç" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-gray-800">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: option.value }}></div>
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">{editingCourse ? 'Güncelle' : 'Ekle'}</Button>
              {editingCourse && (
                <Button type="button" variant="outline" onClick={() => setEditingCourse(null)} className="ml-2 bg-white text-gray-800 hover:bg-gray-200">İptal</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
