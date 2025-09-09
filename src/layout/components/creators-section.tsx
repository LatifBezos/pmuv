import { Creators } from "@/types";
import { BeerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaymentBox from "@/layout/components/payment-box";

export default function CreatorSection({ creator }: { creator: Creators }) {
  const messages = [
    { name: "Alice", text: "Bravo pour ton travail 👏" },
    { name: "Bob", text: "Un verre pour te soutenir 🍻" },
    { name: "Clara", text: "Merci pour ton contenu 🙌" },
  ];

  return (
    <div
      className="min-h-screen text-black grid md:grid-cols-2"
      style={{ backgroundColor: `${creator.color}` }}
    >
      {/* Colonne gauche : Image + Bio */}
      <div className="flex flex-col items-center justify-start p-6 border-r border-black space-y-6">
        <img
          src={creator.image_url}
          alt={creator.slug}
          className="object-cover max-h-[400px] border border-black"
        />
        <div className="w-full border-t border-black pt-4">
          <h2 className="text-xl font-bold mb-2">À propos</h2>
          <p className="leading-relaxed">
            {creator.bio ?? "Ce créateur n’a pas encore ajouté de bio."}
          </p>
        </div>
      </div>

      {/* Colonne droite : Paiement + Messages */}
      <div className="flex flex-col justify-start p-10 space-y-6">
        {/* Paiement */}
        <div>
          <p className="uppercase tracking-widest font-bold">SOUTENIR</p>
          <h1 className="text-4xl font-extrabold leading-tight">
            PAYE UN VERRE À <br /> {creator.slug}
          </h1>
          <p className="italic">Avec PayeMoiUnVerre 🍹</p>

          {/* Choix de verres */}
          <div className="flex gap-2 my-4">
            {["1", "3", "5", "10"].map((n) => (
              <button
                key={n}
                className="px-4 py-2 border border-black font-semibold hover:bg-black hover:text-white transition"
              >
                {n} VERRE{n !== "1" && "S"}
              </button>
            ))}
          </div>

          {/* Champs utilisateur */}
          <input
            type="text"
            placeholder="Nom ou @votresocial"
            className="w-full border border-black px-3 py-2 mb-2 focus:outline-none"
          />
          <textarea
            placeholder="Dites quelque chose de gentil..."
            className="w-full border border-black px-3 py-2 focus:outline-none"
          />

          <button
            className="bg-black font-bold py-3 px-6 text-lg hover:text-white transition mt-4"
            style={{ color: `${creator.color}` }}
          >
            Paye un verre
          </button>
        </div>

        <div className="mt-8 border-t border-black pt-4">
          <h2 className="text-xl font-bold mb-2">Messages des supporters</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className="border border-black p-3 bg-white/40">
                <p className="font-bold">{msg.name}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export { CreatorSection };