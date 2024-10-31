import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Unlock, Dna, Star, Layers } from 'lucide-react';

const LoveDNAExperience = () => {
  const [unlockedSections, setUnlockedSections] = useState({
    emotional: false,
    intellectual: false,
    physical: false,
    spiritual: false
  });

  const [personalData, setPersonalData] = useState({
    name1: "Nama Pasangan 1",
    name2: "Nama Pasangan 2",
    compatibility: 0
  });

  const [dnaSequence, setDnaSequence] = useState({
    emotional: generateDNASequence(),
    intellectual: generateDNASequence(),
    physical: generateDNASequence(),
    spiritual: generateDNASequence()
  });

  function generateDNASequence(length = 20) {
    const bases = ['A', 'T', 'C', 'G'];
    return Array.from(
      { length }, 
      () => bases[Math.floor(Math.random() * bases.length)]
    ).join('');
  }

  function calculateCompatibility() {
    const emotionalMatch = compareSequence(dnaSequence.emotional);
    const intellectualMatch = compareSequence(dnaSequence.intellectual);
    const physicalMatch = compareSequence(dnaSequence.physical);
    const spiritualMatch = compareSequence(dnaSequence.spiritual);

    const totalCompatibility = (
      emotionalMatch + 
      intellectualMatch + 
      physicalMatch + 
      spiritualMatch
    ) / 4;

    setPersonalData(prev => ({
      ...prev,
      compatibility: Math.round(totalCompatibility)
    }));
  }

  function compareSequence(sequence) {
    const matchRate = sequence.split('').filter(
      (base, index) => base === sequence[sequence.length - index - 1]
    ).length / sequence.length;

    return matchRate * 100;
  }

  function unlockSection(section) {
    setUnlockedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }

  useEffect(() => {
    calculateCompatibility();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-8">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 flex items-center justify-center"
        >
          <Dna className="mr-4 text-pink-400" />
          Love DNA Explorer
          <Heart className="ml-4 text-red-500" />
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-purple-800/50 rounded-2xl p-6"
          >
            <h2 className="text-3xl font-semibold mb-6 text-pink-300">
              Profil Pasangan
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nama Pasangan 1"
                className="w-full p-3 bg-purple-700 rounded-lg text-white"
                value={personalData.name1}
                onChange={(e) => setPersonalData(prev => ({
                  ...prev, 
                  name1: e.target.value
                }))}
              />
              <input 
                type="text" 
                placeholder="Nama Pasangan 2"
                className="w-full p-3 bg-purple-700 rounded-lg text-white"
                value={personalData.name2}
                onChange={(e) => setPersonalData(prev => ({
                  ...prev, 
                  name2: e.target.value
                }))}
              />
              <div className="bg-purple-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-400" />
                  <span>Tingkat Kecocokan:</span>
                  <span className="ml-2 font-bold text-green-400">
                    {personalData.compatibility}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            {Object.keys(dnaSequence).map((section) => (
              <div 
                key={section}
                className="bg-purple-800/50 rounded-2xl p-6"
              >
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => unlockSection(section)}
                >
                  <h3 className="text-2xl capitalize">
                    {section} Connection
                  </h3>
                  {unlockedSections[section] ? (
                    <Unlock className="text-green-400" />
                  ) : (
                    <Lock className="text-red-400" />
                  )}
                </div>

                {unlockedSections[section] && (
                  <div className="bg-purple-900 p-4 rounded-lg">
                    <p className="text-sm font-mono break-words">
                      DNA: {dnaSequence[section]}
                    </p>
                    <div className="mt-2 text-sm text-gray-400">
                      Kecocokan: {compareSequence(dnaSequence[section]).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <button 
            onClick={() => {
              const newSequences = Object.fromEntries(
                Object.keys(dnaSequence).map(section => [
                  section, 
                  generateDNASequence()
                ])
              );
              setDnaSequence(newSequences);
              calculateCompatibility();
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full flex items-center mx-auto"
          >
            <Layers className="mr-2" /> Regenerate Love DNA
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveDNAExperience;