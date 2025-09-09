import { Creators } from "@/types";
import { BeerIcon } from "lucide-react";

export default function CreatorSection({ creator }: { creator: Creators }) {
  // Messages mockés (à remplacer par tes données dynamiques)
  const messages = [
    { name: "Alice", text: "Bravo pour ton travail 👏" },
    { name: "Bob", text: "Un verre pour te soutenir 🍻" },
    { name: "Clara", text: "Merci pour ton contenu 🙌" },
    { name: "David", text: "Continue comme ça 💪" },
  ];

  return (
    <div
      className="min-h-screen text-black grid md:grid-cols-2 relative"
      style={{ backgroundColor: creator.color }}
    >
      {/* Colonne gauche : Image + Bio */}
      <div className="flex flex-col items-center justify-start p-6 border-r border-black space-y-6">
        <div className="relative">
          <img
            src={creator.image_url}
            alt={creator.slug}
            className="object-cover max-h-[400px] border border-black rounded-md"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <BeerIcon className="size-16 rotate-12 text-white drop-shadow-lg" />
          </button>
        </div>
        <div className="w-full border-t border-black pt-4">
          <h2 className="text-xl font-bold mb-2">À propos</h2>
          <p className="leading-relaxed">
            {creator.bio ?? "Ce créateur n’a pas encore ajouté de bio."}
          </p>
        </div>
      </div>

      {/* Colonne droite : Paiement */}
      <div className="flex flex-col justify-start p-6 md:p-10 space-y-6">
        <div>
          <p className="uppercase tracking-widest font-bold">SOUTENIR</p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            PAYE UN VERRE À <br /> {creator.slug}
          </h1>
          <p className="italic text-sm md:text-base">
            Avec PayeMoiUnVerre 🍹
          </p>

          <div className="flex gap-2 my-4 flex-wrap">
            {["1", "3", "5", "10"].map((n) => (
              <button
                key={n}
                className="px-4 py-2 border border-black font-semibold hover:bg-black hover:text-white transition rounded-md"
              >
                {n} VERRE{n !== "1" && "S"}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Nom ou @votresocial"
            className="w-full border border-black px-3 py-2 mb-2 focus:outline-none rounded-md"
          />
          <textarea
            placeholder="Dites quelque chose de gentil..."
            className="w-full border border-black px-3 py-2 focus:outline-none rounded-md"
          />

          <button
            className="bg-black font-bold py-3 px-6 text-lg hover:text-white transition mt-4 rounded-md"
            style={{ color: creator.color }}
          >
            Paye un verre
          </button>
        </div>
      </div>

      <div
        className="
          absolute bottom-5 right-5
          w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl
          h-24 sm:h-28 md:h-28
          p-3 md:p-4
          rounded-xl shadow-lg overflow-hidden fade-mask
        "
      >
        <div className="scroll-loop w-full">
          {[...messages, ...messages].map((msg, idx) => (
            <div
              key={idx}
              className="border border-gray-200 mt-4 p-3 bg-white rounded-md shadow-sm"
            >
              <p className="font-bold text-gray-800">{msg.name}</p>
              <p className="text-gray-700 text-sm md:text-base">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CreatorSection };
