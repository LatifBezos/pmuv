"use client"
// components/DrinkCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DrinkCard() {
  const [fillLevel, setFillLevel] = useState(30);
  const [supporters, setSupporters] = useState([
    { name: 'Cathy', amount: 3, message: 'À votre santé !' },
    { name: 'Tony', amount: 5, message: 'Tchin-tchin !' }
  ]);

  const handleDonation = (amount) => {
    setFillLevel(Math.min(100, fillLevel + (amount * 5)));
    setSupporters([
      ...supporters,
      { name: 'Nouveau', amount, message: 'Super travail !' }
    ].slice(-2));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#CAF0F8] rounded-2xl shadow-lg border border-[#90E0EF] font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#0077B6] rounded-full flex items-center justify-center text-white text-xl">
          🍹
        </div>
        <h2 className="text-2xl text-[#0077B6] italic">"Paye-moi un verre !"</h2>
      </div>

      {/* Verre animé */}
      <div className="relative mx-auto w-24 h-32 mb-8">
        {/* Contour du verre */}
        <div className="absolute top-0 w-full h-full border-2 border-[#00B4D8] rounded-t-lg rounded-b-[20px] overflow-hidden">
          {/* Liquide */}
          <motion.div
            animate={{ height: `${fillLevel}%` }}
            transition={{ type: 'spring', damping: 10 }}
            className="absolute bottom-0 w-full bg-[#00B4D8]"
            style={{ 
              borderTopLeftRadius: '50% 20%',
              borderTopRightRadius: '50% 20%'
            }}
          />
        </div>
        {/* Base du verre */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-[#0077B6] rounded-b-full" />
      </div>

      {/* Boutons */}
      <div className="flex justify-center gap-4 mb-8">
        {[3, 5, 10].map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonation(amount)}
            className="w-14 h-14 rounded-full bg-[#0077B6] hover:bg-[#00B4D8] text-white flex flex-col items-center justify-center transition-all hover:scale-110 shadow-md"
          >
            <span className="text-lg">
              {amount === 3 ? '🫧' : amount === 5 ? '🍸' : '🍾'}
            </span>
            <span className="text-xs">${amount}</span>
          </button>
        ))}
      </div>

      {/* Supporters */}
      <div className="bg-white/90 p-3 rounded-lg border border-[#90E0EF]">
        <p className="font-bold text-[#0077B6] text-sm mb-2">Derniers verres offerts :</p>
        <div className="space-y-1">
          {supporters.map((supporter, index) => (
            <div key={index} className="text-sm text-[#0077B6]">
              <span className="font-medium">• {supporter.name}</span>
              {' '}a offert {supporter.amount > 1 ? `${supporter.amount} verres` : '1 verre'}
              {' '}<span className="text-[#00B4D8]">"{supporter.message}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}