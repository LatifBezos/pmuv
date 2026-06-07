import Link from "next/link";
import { BeerIcon } from "lucide-react";

const AboutOMUV = () => {
  const text = `
  Offre Moi Un Verre, c’est un espace qui respire avec les créateurs.
  Un lieu qui capte les vibrations des univers créatifs,
  ceux qui naissent dans les villes africaines,
  dans leurs rythmes, leurs élans, leurs urgences.
  
  Dans cet afropolitalisme-là —
  mélange de racines profondes et d’ouvertures mondiales —
  les histoires circulent vite,
  les idées voyagent,
  les identités se tressent.
  
  Et au cœur de tout ça,
  Offre Moi Un Verre propose une nouvelle dynamique de faire les choses :
  plus directe,
  plus vivante,
  plus humaine.
  
  Chaque créateur y dépose son univers à travers une page personnelle qu’il peut partager librement.
  Cet espace devient une extension de son expression :
  présenter son travail,
  raconter son parcours,
  et offrir à sa communauté une expérience plus proche, plus authentique.
  
  Chaque visite devient rencontre.
  Les personnes qui découvrent un univers peuvent y laisser une contribution symbolique,
  un geste volontaire qui reconnaît le travail réalisé et la valeur de ce qui est partagé.
  Un message peut l’accompagner,
  comme une trace humaine dans le flux numérique.
  
  Ainsi,
  chaque contribution devient un écho chaleureux,
  un lien qui se tisse entre création et reconnaissance,
  sans distance,
  sans bruit,
  dans une circulation simple et presque organique.
  
  Offremoiunverre ne parle pas seulement de contribution.
  Il parle de présence.
  De regard posé sur un effort réel.
  De ce moment fragile où une création trouve enfin quelqu’un pour la voir,
  la reconnaître,
  et lui répondre.
  
  Et peut-être qu’au fond,
  tout commence ici :
  dans ce simple geste qui relie deux mondes…
  avant que le silence ne les oublie.
  
  Parce qu’au bout du compte,
  chaque création cherche moins à être vue
  qu’à être reconnue dans ce qu’elle a coûté à naître.
  
  Et c’est peut-être là que commence la vraie valeur du geste.
  `

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      
      <div className="w-full max-w-2xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1">
        
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <Link href="/" className="cursor-pointer transition-transform hover:scale-110 hover:curosor-pointer">
            <BeerIcon className="size-14 text-white rotate-12" />
          </Link>

          <h1 className="text-xl font-semibold text-white mt-3">
            Offremoiunverre
          </h1>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 pb-8">
          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line text-center">
            {text}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutOMUV;