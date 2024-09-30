"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Users, Lightbulb, Rocket, Globe, Edit, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAboutUs, updateAboutUs } from '@/services/api';


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
  image: File | null;
  socialMedia: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  }
}

interface AboutUsData {
  vision: string;
  mission: string;
  features: Mission[];
    teamMembers: TeamMember[];

}

export default function AboutUsManagementPage() {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [memberSocialMedia, setMemberSocialMedia] = useState<{
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    instagram: string | null;
  } | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [missionTitle, setMissionTitle] = useState<string>('');
  const [missionDescription, setMissionDescription] = useState<string>('');

  const [memberName, setMemberName] = useState<string>('');
  const [memberRole, setMemberRole] = useState<string>('');
  const [memberBio, setMemberBio] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  useEffect(() => {
    if (editingMission) {
      setSelectedIcon(editingMission.icon);
      setMissionTitle(editingMission.title);
      setMissionDescription(editingMission.description);
    } else {
      setSelectedIcon('');
      setMissionTitle('');
      setMissionDescription('');
    }
  }, [editingMission]);

  useEffect(() => {
    if (editingTeamMember) {
      setMemberName(editingTeamMember.name);
      setMemberRole(editingTeamMember.role);
      setMemberBio(editingTeamMember.bio);
      setImage(editingTeamMember.image);
      
    } else {
      setMemberName('');
      setMemberRole('');
      setMemberBio('');
      setImage(null);
    }
  }, [editingTeamMember]);

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
      if (aboutUsData) {
        await updateAboutUs(aboutUsData);
        console.log('About us data updated successfully');
      }
    } catch (error) {
      console.error('Error updating about us data:', error);
    }
  };

  const handleAddMission = (mission: Mission) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        features: [...aboutUsData.features, { ...mission, id: Date.now().toString() }],
      };
      setAboutUsData(updatedData);
    }
  };

  const handleUpdateMission = (updatedMission: Mission) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        features: aboutUsData.features.map((mission) =>
          mission.id === updatedMission.id ? updatedMission : mission
        ),
      };
      setAboutUsData(updatedData);
      setEditingMission(null);
    }
  };

  const handleDeleteMission = (id: string) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        features: aboutUsData.features.filter((mission) => mission.id !== id),
      };
      setAboutUsData(updatedData);
    }
  };

  const handleAddTeamMember = (member: TeamMember) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        teamMembers: [...aboutUsData.teamMembers, { ...member, id: Date.now().toString() }],
      };
      setAboutUsData(updatedData);
    }
  };
  const handleUpdateTeamMember = async (updatedMember: TeamMember) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        teamMembers: aboutUsData.teamMembers.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        ),
      };
      setAboutUsData(updatedData);

      try {
        const formData = new FormData();
        formData.append('name', updatedMember.name);
        formData.append('role', updatedMember.role);
        formData.append('bio', updatedMember.bio);
        if (updatedMember.image instanceof File) {
          formData.append('image', updatedMember.image);
        }
        formData.append('id', updatedMember.id);

        await updateAboutUs(formData);
        console.log('Team member updated successfully');
      } catch (error) {
        console.error('Error updating team member:', error);
      }
    }
  };

  const handleDeleteTeamMember = (id: string) => {
    if (aboutUsData) {
      const updatedData = {
        ...aboutUsData,
        teamMembers: aboutUsData.teamMembers.filter((member) => member.id !== id),
      };
      setAboutUsData(updatedData);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (aboutUsData) {
      const formData = new FormData();
      formData.append('vision', aboutUsData.vision);
      formData.append('mission', aboutUsData.mission);
      formData.append('features', JSON.stringify(aboutUsData.features));
      formData.append('teamMembers', JSON.stringify(aboutUsData.teamMembers));
      if (image) {
        formData.append('image', image);
      }

      // Append team member images
      aboutUsData.teamMembers.forEach((member, index) => {
        if (member.image instanceof File) {
          formData.append(`teamMembers`, member.image);
        }
      });

      try {
        const response = await updateAboutUs(formData);
        // Handle the response
        // ...
      } catch (error) {
        console.error('Error updating About Us:', error);
      }
    }
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
    <form onSubmit={handleSubmit} className="p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Users className="h-8 w-8 mr-3 text-blue-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
          Hakkımızda Yönetimi
        </h1>
      </motion.div>

      {/* Kaydet Butonu Sağ Üstte */}
      <Button
        type="submit"
        className="absolute right-6 top-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-md"
      >
        Kaydet
      </Button>

      {/* Vision and Mission Section */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-800">Vizyon ve Misyon</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="vision" className="block text-lg font-medium text-gray-700 mb-2">
                Vizyon
              </label>
              <Textarea
                id="vision"
                value={aboutUsData?.vision || ''}
                onChange={(e) => setAboutUsData({ ...aboutUsData, vision: e.target.value } as AboutUsData)}
                className="w-full border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition duration-200 text-gray-800"
                rows={4}
                placeholder="Vizyonunuzu buraya yazın"
              />
            </div>
            <div>
              <label htmlFor="mission" className="block text-lg font-medium text-gray-700 mb-2">
                Misyon
              </label>
              <Textarea
                id="mission"
                value={aboutUsData?.mission || ''}
                onChange={(e) => setAboutUsData({ ...aboutUsData, mission: e.target.value } as AboutUsData)}
                className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 text-gray-800"
                rows={4}
                placeholder="Misyonunuzu buraya yazın"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List of Features */}
      {aboutUsData?.features &&
        aboutUsData.features.map((mission) => {
          const IconComponent = getIconComponent(mission.icon);
          return (
            <Card key={mission.id} className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">{mission.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{mission.description}</p>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingMission(mission)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMission(mission.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

      {/* Mission Form */}
      <Card className="mt-8 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-800">{editingMission ? 'Misyonu Düzenle' : 'Yeni Misyon Ekle'}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-lg shadow-md">
          {/* İç içe formu kaldırdık ve 'onSubmit' yerine 'onClick' kullandık */}
          <div className="space-y-6">
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                İkon
              </label>
              <Select
                name="icon"
                value={selectedIcon}
                onValueChange={(value) => setSelectedIcon(value)}
              >
                <SelectTrigger className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 text-black">
                  <SelectValue placeholder="İkon Seç" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Users" className="text-black">
                    Users
                  </SelectItem>
                  <SelectItem value="Lightbulb" className="text-black">
                    Lightbulb
                  </SelectItem>
                  <SelectItem value="Rocket" className="text-black">
                    Rocket
                  </SelectItem>
                  <SelectItem value="Globe" className="text-black">
                    Globe
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Başlık
              </label>
              <Input
                name="title"
                placeholder="Başlık"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                
                className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 bg-blue-50 text-blue-800"
              /> 
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <Textarea
                name="description"
                placeholder="Açıklama"
                value={missionDescription}
                onChange={(e) => setMissionDescription(e.target.value)}
                
                className="w-full border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 bg-purple-50 text-purple-800"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={() => {
                  const missionData = {
                    id: editingMission?.id || '',
                    icon: selectedIcon || 'Users',
                    title: missionTitle,
                    description: missionDescription,
                  };
                  if (editingMission) {
                    handleUpdateMission(missionData);
                  } else {
                    handleAddMission(missionData);
                  }
                  setEditingMission(null);
                  setSelectedIcon('');
                  setMissionTitle('');
                  setMissionDescription('');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-md"
              >
                {editingMission ? 'Güncelle' : 'Ekle'}
              </Button>
              {editingMission && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingMission(null);
                    setSelectedIcon('');
                    setMissionTitle('');
                    setMissionDescription('');
                  }}
                  className="border-2 border-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  İptal
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Section */}
      {aboutUsData?.teamMembers && aboutUsData.teamMembers.length > 0 && (
        <>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6 mt-12">
            Takım Üyeleri
          </h2>
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
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTeamMember(member)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTeamMember(member.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Team Member Form */}
      <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">
            {editingTeamMember ? 'Takım Üyesini Düzenle' : 'Yeni Takım Üyesi Ekle'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* İç içe formu kaldırdık ve 'onSubmit' yerine 'onClick' kullandık */}
          <div className="space-y-6">
            <Input
              name="name"
              placeholder="İsim"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
            <Input
              name="role"
              placeholder="Rol"
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
            <Textarea
              name="bio"
              placeholder="Biyografi"
              value={memberBio}
              onChange={(e) => setMemberBio(e.target.value)}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
             <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Profil Resmi
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            accept="image/*"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs h-auto" />
          )}
        </div>
            <Input
              name="github"
              placeholder="Github Kullanıcı Adı"
              value={memberSocialMedia?.github || ''}
              onChange={(e) => setMemberSocialMedia({ ...memberSocialMedia, github: e.target.value, linkedin: memberSocialMedia?.linkedin || null, twitter: memberSocialMedia?.twitter || null, instagram: memberSocialMedia?.instagram || null })}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
            <Input
              name="linkedin"
              placeholder="Linkedin Kullanıcı Adı"
              value={memberSocialMedia?.linkedin || ''}
              onChange={(e) => setMemberSocialMedia({ ...memberSocialMedia, linkedin: e.target.value, github: memberSocialMedia?.github || null, twitter: memberSocialMedia?.twitter || null, instagram: memberSocialMedia?.instagram || null })}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
            <Input
              name="twitter"
              placeholder="Twitter Kullanıcı Adı"
              value={memberSocialMedia?.twitter || ''}
              onChange={(e) => setMemberSocialMedia({ ...memberSocialMedia, twitter: e.target.value, github: memberSocialMedia?.github || null, linkedin: memberSocialMedia?.linkedin || null, instagram: memberSocialMedia?.instagram || null })}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />
            <Input
              name="instagram"
              placeholder="Instagram Kullanıcı Adı"
              value={memberSocialMedia?.instagram || ''}
              onChange={(e) => setMemberSocialMedia({ ...memberSocialMedia, instagram: e.target.value, github: memberSocialMedia?.github || null, linkedin: memberSocialMedia?.linkedin || null, twitter: memberSocialMedia?.twitter || null })}
              
              className="bg-white text-gray-800 border-2 border-blue-200 focus:border-purple-400 rounded-lg"
            />

              
            
            <div className="flex justify-end space-x-4">
              {editingTeamMember && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingTeamMember(null);
                    setMemberName('');
                    setMemberRole('');
                    setMemberBio('');
                    setImage(null);
                    setMemberSocialMedia({
                      github: '',
                      linkedin: '',
                      twitter: '',
                      instagram: '',
                    });
                  }}
                  className="bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-300"
                >
                  İptal
                </Button>
              )}
              <Button
                type="button"
                onClick={() => {
                  const memberData = {
                    id: editingTeamMember?.id || '',
                    name: memberName,
                    role: memberRole,
                    bio: memberBio,
                    image: image,
                    socialMedia: memberSocialMedia,
                  };
                  if (editingTeamMember) {
                    handleUpdateTeamMember(memberData as TeamMember);
                  } else {
                    handleAddTeamMember(memberData as TeamMember);
                  }
                  setEditingTeamMember(null);
                  setMemberName('');
                  setMemberRole('');
                  setMemberBio('');
                  setImage(null);
                  setMemberSocialMedia(null);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                {editingTeamMember ? 'Güncelle' : 'Ekle'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
  );
}
    </form>
  );
}
    </form>
  );
}