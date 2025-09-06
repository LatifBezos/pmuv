import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/signup-illustration.png"
          alt="Signup Illustration"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* SECTION DROITE */}
      <div className="flex flex-col items-center justify-center bg-[#40916c] p-8">
        <h1 className="text-3xl font-bold text-white">
          Créer votre compte
        </h1>
        <p className="text-gray-200 mb-8">
          Choisissez un [Slug] pour votre page.
        </p>
        <div className="flex items-start py-2 border border-2 rounded-md mb-4 w-full max-w-xs justify-center align-center">
          <p className="text-white">payemoiunverre.com/</p>
          <input
            type="text"
            placeholder="votre_slug" 
            className="outline-none text-white placeholder-gray-300 w-32"
          />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <button className="bg-white text-[#40916c] font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition mb-4">
            Créer mon compte
          </button>
        </div>

        <div className="flex items-center mt-6 text-white text-center">
          <p>Vous avez deja un compte ?</p>
          <Link href="/login" className="underline font-bold ml-2">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
