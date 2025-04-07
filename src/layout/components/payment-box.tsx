"use client";

import { useState } from "react";
import { BeerIcon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const predefinedOffers = [1, 2, 3];
const pricePerGlass = 1200; // Prix d'un verre en FCFA

const PaymentBox = () => {
  const [quantity, setQuantity] = useState(predefinedOffers[0]);
  const [customQuantity, setCustomQuantity] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handlePayment = () => {
    const finalQuantity = customQuantity || quantity;
    alert(
      `Paiement de ${finalQuantity} verre(s) pour ${
        finalQuantity * pricePerGlass
      } FCFA\nMessage: ${message}`
    );
  };

  return (
    <div className="min-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border text-center text-black mt-10">
      <h2 className="text-3xl font-bold mb-6">Offrir un verre</h2>

      {/* Offres prédéfinies */}
      <div className="flex justify-center gap-4 mb-6">
        {predefinedOffers.map((offer) => (
          <Button
            key={offer}
            className={`px-4 py-2 rounded-lg font-semibold border ${
              quantity === offer
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => {
              setQuantity(offer);
              setCustomQuantity(null);
            }}
          >
            {offer} verre{offer > 1 ? "s" : ""}
          </Button>
        ))}
      </div>

      {/* Sélecteur de quantité personnalisée */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <Button
          variant="outline"
          className="border p-3 rounded-full"
          onClick={() =>
            setCustomQuantity((prev) => Math.max(1, (prev || quantity) - 1))
          }
        >
          <Minus size={20} />
        </Button>
        <span className="text-2xl font-bold">{customQuantity || quantity}</span>
        <Button
          variant="outline"
          className="border p-3 rounded-full"
          onClick={() => setCustomQuantity((prev) => (prev || quantity) + 1)}
        >
          <Plus size={20} />
        </Button>
      </div>

      {/* Message personnalisé */}
      <Textarea
        className="w-full mb-6 p-3 border rounded-lg"
        placeholder="Laissez un message comme si vous étiez dans un bar..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Affichage du prix total */}
      <p className="text-xl mb-6 font-semibold">
        Total :{" "}
        <span className="font-bold">
          {(customQuantity || quantity) * pricePerGlass} FCFA
        </span>
      </p>

      {/* Bouton de paiement */}
      <Button
        className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 rounded-lg shadow-md"
        onClick={handlePayment}
      >
        <BeerIcon size={24} /> Payer maintenant
      </Button>
    </div>
  );
};

export default PaymentBox;
