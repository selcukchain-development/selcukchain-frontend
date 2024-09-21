"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Users, Lightbulb, Rocket, Globe, Edit, Trash, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAboutUs, updateAboutUs } from '@/services/api'

interface Mission {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

interface AboutUsData {
  vision: string;
  mission: string;
  features: Mission[];
  teamMembers: TeamMember[];
}

export default function AboutUsManagementPage() {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData>({
    vision: '',
    mission: '',
    features: [],
    teamMembers: []
  });
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      const response = await getAboutUs();
      setAboutUsData(response.data);
    } catch (error) {
      console.error('Error fetching about us data:', error);
    }
  };

  const handleUpdateAboutUs = async () => {
    try {
      await updateAboutUs(aboutUsData);
      console.log('About us data updated successfully');
    } catch (error) {
      console.error('Error updating about us data:', error);
    }
  };

  const handleAddMission = async (mission: Mission) => {
    const updatedData = {
      ...aboutUsData,
      features: [...aboutUsData.features, { ...mission, id: Date.now().toString() }]
    };
    setAboutUsData(updatedData);
    await handleUpdateAboutUs();
  };

  const handleUpdateMission = async (updatedMission: Mission) => {
    const updatedData = {
      ...aboutUsData,
      features: aboutUsData.features.map(mission => 
        mission.id === updatedMission.id ? updatedMission : mission
      )
    };
    setAboutUsData(updatedData);
    setEditingMission(null);
    await handleUpdateAboutUs();
  };

  const handleDeleteMission = async (id: string) => {
    const updatedData = {
      ...aboutUsData,
      features: aboutUsData.features.filter(mission => mission.id !== id)
    };
    setAboutUsData(updatedData);
    await handleUpdateAboutUs();
  };

  const handleAddTeamMember = async (member: TeamMember) => {
    const updatedData = {
      ...aboutUsData,
      teamMembers: [...aboutUsData.teamMembers, { ...member, id: Date.now().toString() }]
    };
    setAboutUsData(updatedData);
    await handleUpdateAboutUs();
  };

  const handleUpdateTeamMember = async (updatedMember: TeamMember) => {
    const updatedData = {
      ...aboutUsData,
      teamMembers: aboutUsData.teamMembers.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    };
    setAboutUsData(updatedData);
    setEditingTeamMember(null);
    await handleUpdateAboutUs();
  };

  const handleDeleteTeamMember = async (id: string) => {
    const updatedData = {
      ...aboutUsData,
      teamMembers: aboutUsData.teamMembers.filter(member => member.id !== id)
    };
    setAboutUsData(updatedData);
    await handleUpdateAboutUs();
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'Lightbulb':
        return Lightbulb;
      case 'Rocket':
        return Rocket;
      case 'Globe':
        return Globe;
      default:
        return Users;
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Users className="h-8 w-8 mr-3 text-blue-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">Hakkımızda Yönetimi</h1>
      </motion.div>
      
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-800">Vizyon ve Misyon</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="vision" className="block text-lg font-medium text-gray-700 mb-2">Vizyon</label>
              <Textarea
                id="vision"
                value={aboutUsData.vision}
                onChange={(e) => setAboutUsData({ ...aboutUsData, vision: e.target.value })}
                className="w-full border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition duration-200 text-gray-800"
                rows={4}
                placeholder="Vizyonunuzu buraya yazın"
              />
            </div>
            <div>
              <label htmlFor="mission" className="block text-lg font-medium text-gray-700 mb-2">Misyon</label>
              <Textarea
                id="mission"
                value={aboutUsData.mission}
                onChange={(e) => setAboutUsData({ ...aboutUsData, mission: e.target.value })}
                className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 text-gray-800"
                rows={4}
                placeholder="Misyonunuzu buraya yazın"
              />
            </div>
            <Button onClick={handleUpdateAboutUs} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-md">
              Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>

      {aboutUsData.features && aboutUsData.features.length > 0 && (
        <>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">Neler Yapıyoruz?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutUsData.features.map((mission) => (
              <Card key={mission.id} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {getIconComponent(mission.icon)({ className: "h-6 w-6 text-blue-500 mr-2" })}
                    <h3 className="text-xl font-semibold text-gray-800">{mission.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{mission.description}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setEditingMission(mission)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteMission(mission.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <Card className="mt-8 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-800">{editingMission ? 'Misyonu Düzenle' : 'Yeni Misyon Ekle'}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const missionData = {
              id: editingMission?.id || '',
              icon: formData.get('icon') as string,
              title: formData.get('title') as string,
              description: formData.get('description') as string,
            }
            if (editingMission) {
              await handleUpdateMission(missionData)
            } else {
              await handleAddMission(missionData)
            }
            // Clear form fields manually
            if (e.currentTarget instanceof HTMLFormElement) {
              const iconSelect = e.currentTarget.querySelector('select[name="icon"]') as HTMLSelectElement;
              const titleInput = e.currentTarget.querySelector('input[name="title"]') as HTMLInputElement;
              const descriptionTextarea = e.currentTarget.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
              
              if (iconSelect) iconSelect.value = '';
              if (titleInput) titleInput.value = '';
              if (descriptionTextarea) descriptionTextarea.value = '';
            }
            // Reset the editingMission state
            setEditingMission(null)
          }}>
            <div className="space-y-6">
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                <Select name="icon" defaultValue={editingMission?.icon}>
                  <SelectTrigger className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 text-black">
                    <SelectValue placeholder="İkon Seç" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Users" className="text-black">Users</SelectItem>
                    <SelectItem value="Lightbulb" className="text-black">Lightbulb</SelectItem>
                    <SelectItem value="Rocket" className="text-black">Rocket</SelectItem>
                    <SelectItem value="Globe" className="text-black">Globe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <Input name="title" placeholder="Başlık" defaultValue={editingMission?.title} required className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 bg-blue-50 text-blue-800" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <Textarea name="description" placeholder="Açıklama" defaultValue={editingMission?.description} required className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 bg-purple-50 text-purple-800" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-md">
                  {editingMission ? 'Güncelle' : 'Ekle'}
                </Button>
                {editingMission && (
                  <Button type="button" variant="outline" onClick={() => setEditingMission(null)} className="border-2 border-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
                    İptal
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {aboutUsData.teamMembers && aboutUsData.teamMembers.length > 0 && (
        <>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6 mt-12">Takım Üyeleri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutUsData.teamMembers.map((member) => (
              <Card key={member.id} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-gray-500 mb-4">{member.bio}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setEditingTeamMember(member)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteTeamMember(member.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">
            {editingTeamMember ? 'Takım Üyesini Düzenle' : 'Yeni Takım Üyesi Ekle'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const memberData = {
              id: editingTeamMember?.id || '',
              name: formData.get('name') as string,
              role: formData.get('role') as string,
              bio: formData.get('bio') as string,
            }
            if (editingTeamMember) {
              await handleUpdateTeamMember(memberData)
            } else {
              await handleAddTeamMember(memberData)
            }
            // Clear form fields manually
            if (e.currentTarget instanceof HTMLFormElement) {
              const nameInput = e.currentTarget.querySelector('input[name="name"]') as HTMLInputElement;
              const roleInput = e.currentTarget.querySelector('input[name="role"]') as HTMLInputElement;
              const bioTextarea = e.currentTarget.querySelector('textarea[name="bio"]') as HTMLTextAreaElement;
              
              if (nameInput) nameInput.value = '';
              if (roleInput) roleInput.value = '';
              if (bioTextarea) bioTextarea.value = '';
            }
            setEditingTeamMember(null)
          }}>
            <div className="space-y-6">
              <Input 
                name="name" 
                placeholder="İsim" 
                defaultValue={editingTeamMember?.name} 
                required 
                className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
              />
              <Input 
                name="role" 
                placeholder="Rol" 
                defaultValue={editingTeamMember?.role} 
                required 
                className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
              />
              <Textarea 
                name="bio" 
                placeholder="Biyografi" 
                defaultValue={editingTeamMember?.bio} 
                required 
                className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
              />
              <div className="flex justify-end space-x-4">
                {editingTeamMember && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditingTeamMember(null)} 
                    className="bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-300"
                  >
                    İptal
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  {editingTeamMember ? 'Güncelle' : 'Ekle'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
