"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Zap, DollarSign, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PeepleWebsite: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    console.log('scrollY:', scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);



  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] to-purple-300" />
        <div className="absolute inset-0 opacity-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-6xl font-bold mb-2 animate-bounce">
              Peeple
              <Heart className="inline-block ml-2 text-pink-400" />
            </h1>
            <p className="text-2xl italic animate-pulse">Connect. Match. Love.</p>
          </div>
        </header>

        {/* Tagline */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4 transform -rotate-2">
              Find Your Perfect Match Today!
            </h2>
            <p className="text-xl text-white transform rotate-1">
              Experience dating like never before with Peeple
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12 transform -rotate-1">
              Our Unique Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<DollarSign size={48} className="animate-spin-slow" />}
                title="Most Affordable"
                description="Budget-friendly dating for everyone!"
              />
              <FeatureCard
                icon={<Users size={48} className="animate-pulse" />}
                title="Women First"
                description="Ladies, take the lead!"
              />
              <FeatureCard
                icon={<Zap size={48} className="animate-bounce" />}
                title="No Algorithms"
                description="Pure, unfiltered connections"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6 transform rotate-1">
              Ready to Find Your Match?
            </h2>
            <button className="bg-white text-[#8B5CF6] px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-110">
              Download Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white bg-opacity-10 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Peeple. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm transform hover:scale-105 transition duration-300">
      <div className="text-white mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default PeepleWebsite;
