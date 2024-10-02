"use client";

import React from 'react';
import { Heart, Zap, DollarSign, Users, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const PeepleWebsite: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 min-h-screen font-sans text-purple-900">
      {/* Header */}
      <header className="py-4 sticky top-0 z-10 backdrop-blur-md bg-white/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold flex items-center text-[#8b5cf6]">
            P<Heart className="inline-block mx-1 text-pink-500" size={28} fill="pink" />ple
          </h1>
          <button className="bg-[#8b5cf6] text-white px-6 py-2 rounded-full text-lg font-bold hover:bg-purple-600 transition duration-300 transform hover:scale-105 shadow-md">
            Get Peeple!
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-[#8b5cf6]">
            Find Your Perfect
            <br />
            <span className="text-purple-800">Match</span> Today!
          </h2>
          <p className="text-2xl sm:text-3xl mb-12 max-w-2xl mx-auto text-purple-700">
            Swipe, chat, and fall in love! 💜✨
          </p>
                    <button className="bg-gradient-to-r from-[#8b5cf6] to-purple-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:from-purple-600 hover:to-[#8b5cf6] transition duration-300 transform hover:scale-110 shadow-lg">
            Download Peeple Now! 🚀
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16 text-[#8b5cf6]">
            Why Peeple is <span className="text-purple-800">Awesome</span> 🎉
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <FeatureCard
              icon={<DollarSign size={48} />}
              title="Budget-Friendly"
              description="Date without breaking the bank! 💰"
              color="bg-purple-300"
            />
            <FeatureCard
              icon={<Users size={48} />}
              title="Ladies First"
              description="Girls run the world! 👑"
              color="bg-purple-400"
            />
            <FeatureCard
              icon={<Zap size={48} />}
              title="Real Connections"
              description="No fake profiles, just real people! 🤗"
              color="bg-purple-500"
            />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#8b5cf6] text-white py-8">
        <div className="container mx-auto text-center px-4">
          <p className="text-lg">© 2024 Peeple. Made with 💜 for love seekers everywhere!</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className={`${color} p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105`}>
      <div className="text-white mb-6 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-100 text-lg">{description}</p>
    </div>
  );
};

export default PeepleWebsite;
