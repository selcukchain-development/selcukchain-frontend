"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Lightbulb, Rocket, Globe, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { getAboutUs } from '@/services/api';
import { AboutUsData } from '@/services/api';
import Loading from '@/app/loading';

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await getAboutUs();
        setAboutUsData(response.data);
      } catch (error) {
        console.error('Error fetching about us data:', error);
      }
    };

    fetchAboutUsData();
  }, []);

  if (!aboutUsData) {
    return <Loading />;
  }

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
    <section id="about" className=" text-white py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SelcukChain Hakkında
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Blockchain teknolojisini öğrenmek, geliştirmek ve yaymak için bir araya gelen tutkulu bir topluluğuz.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/selcuk.jpeg"
              alt="SelcukChain Topluluğu"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Vizyonumuz</h3>
            <p className="text-gray-300 mb-6">
              {aboutUsData.vision}
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Misyonumuz</h3>
            <p className="text-gray-300">
              {aboutUsData.mission}
            </p>
          </motion.div>
        </div>

        {aboutUsData.features.length > 0 && (
          <h3 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Neler Yapıyoruz?
          </h3>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutUsData.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-500 bg-opacity-20">
                  <IconComponent className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-blue-300">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {aboutUsData.teamMembers.length > 0 && (
          <>
            <h3 className="text-3xl font-bold text-center my-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Takım Üyelerimiz
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {aboutUsData.teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-400 to-purple-800 opacity-90 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-blue-500 bg-opacity-80 mx-auto">
                    <Image
                      src={`/team/${member.imagePath}`}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <h4 className="text-2xl font-semibold mb-2 text-center text-white">{member.name}</h4>
                  <p className="text-gray-400 mb-2 text-center">{member.role}</p>
                  <p className="text-white text-center leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    {member.socialMedia?.github && (
                      <a href={member.socialMedia.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-8 h-8 text-gray-400 hover:text-blue-400 transition duration-200" />
                      </a>
                    )}
                    {member.socialMedia?.linkedin && (
                      <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-8 h-8 text-gray-400 hover:text-blue-400 transition duration-200" />
                      </a>
                    )}
                    {member.socialMedia?.twitter && (
                      <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-8 h-8 text-gray-400 hover:text-blue-400 transition duration-200" />
                      </a>
                    )}
                    {member.socialMedia?.instagram && (
                      <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-8 h-8 text-gray-400 hover:text-blue-400 transition duration-200" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
