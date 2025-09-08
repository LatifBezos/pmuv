"use client";

import Link from "next/link";
import { LoaderCircle, CircleCheck, X, BeerIcon } from "lucide-react";
import {authSign, authGoogle, authFB} from "@/hooks/auth0";
import { useState, useRef } from "react";
import { slugSearch } from "@/utils/supabase/queries";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [slugValid, setSlugValid] = useState<boolean | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [slug,setSlug] = useState("")

  
  const [showConnect, setShowConnect] = useState(false);


  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value)
    console.log("email",value)
  }

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPass(value)
    console.log("password",value)
  }

  const signUp = async () => {
    const result = await authSign(email, pass);
    console.log("résult auth", result);
  }

  const userTap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    
    setSlug(value)
    console.log("mon slug",slug)
    setLoading(true);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(async () => {
      if (!value) {
        setSlugValid(null);
        setLoading(false);
        return;
      }

      const result = await slugSearch(value);

      console.log("result", result)

      if (result === true) {
        setSlugValid(false);
      } else {
        setSlugValid(true);
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/signup-illustration.png"
          alt="Signup Illustration"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Section droite */}
      {!showConnect && (<div className="flex flex-col items-center justify-center bg-[#40916c] p-8">
        <span className="absolute top-5 right-5 cursor-pointer">
          <Link href="/" className="text-white">
              <BeerIcon
              className={cn(
                "size-8 sm:size-12 text-white rotate-12 transition-all duration-200"
              )}
            />
          </Link>
        </span>
        <h1 className="text-4xl font-bold text-white mb-2">Créer votre compte</h1>
        <p className="text-gray-200 mb-8 text-lg">
          Choisissez un [Slug] pour votre page.
        </p>

        <div className="flex items-start py-2 px-2 border border-2 rounded-md mb-4 w-full max-w-xs justify-center">
          <p className="text-white basis-1/2">payemoiunverre.com/</p>
          <div className="flex items-center justify-between w-32 basis-1/2">
            <input
              type="text"
              placeholder="votre_slug"
              className="outline-none text-white placeholder-gray-300 w-32"
              onChange={userTap}
            />
            <div>
              {loading && <LoaderCircle className="w-5 h-5 animate-spin text-white" />}
              {!loading && slugValid === true && <CircleCheck className="w-5 h-5 text-white" />}
              {!loading && slugValid === false && <X className="w-5 h-5 text-red-500" />}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <button className="bg-white text-[#40916c] font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition mb-4"
            onClick={() => setShowConnect(true)}
          >
            Créer mon compte
          </button>
        </div>

        <div className="flex items-center mt-6 text-white text-center">
          <p>Vous avez déjà un compte ?</p>
          <Link href="/login" className="underline font-bold ml-2">
            Se connecter
          </Link>
        </div>
      </div>
      )}



      {showConnect && (<div className="flex flex-col items-center justify-center bg-[#40916c] p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Bonjour , {slug}.
        </h1>
        

        {/* Section connect */}
        <div className="flex flex-col w-full max-w-sm space-y-4">
              <input 
                type="text"
                placeholder="email"
                onChange={handleEmail}
                className="flex border border-2 px-4 py-2 rounded-lg mb-4 items-center align-items text-white placeholder-gray-100 w-full text-center"
              />
              <input 
                type="password"
                placeholder="password"
                onChange={handlePass}
                className="flex border border-2 px-4 py-2 rounded-lg mb-4 items-center align-items text-white placeholder-gray-100 w-full text-center"
              />
              <button className="bg-white text-[#40916c] font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition mb-4 cursor-pointer"
                onClick={signUp}
              >
                S'inscrire
              </button>
        </div>

        <div className="flex items-center my-5 justify-center w-full max-w-sm space-x-4">
          <span className="w-full h-0.5 bg-gray-200"></span>
          <p className="text-lg text-white mb-1">ou</p>
          <span className="w-full h-0.5 bg-gray-200"></span>
        </div>


        {/* Boutons sociaux */}
        <div className="flex flex-col w-full max-w-sm space-y-4">
          {/* Google */}
          <button className="flex items-center justify-center bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition p-12 cursor-pointer"
            onClick={() => authGoogle()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6 mr-2"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.59 4.657-6.08 8-11.303 8-6.627 
                0-12-5.373-12-12s5.373-12 12-12c3.059 
                0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 
                6.053 29.268 4 24 4 12.954 4 4 12.954 4 
                24s8.954 20 20 20c11.045 0 20-8.954 
                20-20 0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 
                16.108 19.002 14 24 14c3.059 0 5.842 
                1.154 7.961 3.039l5.657-5.657C34.046 
                6.053 29.268 4 24 4c-7.843 0-14.455 
                4.522-17.694 10.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 
                13.409-5.192l-6.19-5.238C29.211 
                35.091 26.715 36 24 36c-5.202 0-9.599-3.317-11.283-7.946l-6.522 
                5.025C10.286 39.556 16.799 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-1.087 
                3.185-3.025 5.877-5.571 
                7.656l.003-.002 6.19 
                5.238C39.408 36.843 44 30.523 44 
                24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Se connecter avec Google
          </button>

          {/* Facebook */}
          <button className="flex items-center justify-center bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            onClick={() => authFB()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
            >
              <path
                fill="#1877F2"
                d="M22.675 0H1.325C.593 0 0 
                .593 0 1.326v21.348C0 23.407.593 
                24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 
                1.894-4.788 4.659-4.788 1.325 0 2.463.099 
                2.795.143v3.24l-1.918.001c-1.504 
                0-1.796.715-1.796 
                1.763v2.313h3.587l-.467 
                3.622h-3.12V24h6.116C23.407 24 24 
                23.407 24 22.674V1.326C24 
                .593 23.407 0 22.675 0z"
              />
            </svg>
            Se connecter avec Facebook
          </button>

          {/* LinkedIn */}
          <button className="flex items-center justify-center bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
            >
              <path
                fill="#0A66C2"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 
                0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 
                1.637-1.852 3.368-1.852 
                3.598 0 4.263 2.368 
                4.263 5.455v6.288zM5.337 7.433a2.062 
                2.062 0 11.001-4.124 2.062 
                2.062 0 01-.001 4.124zM6.865 
                20.452H3.808V9h3.057v11.452zM22.225 
                0H1.771C.792 0 0 .771 0 
                1.723v20.549C0 23.229.792 
                24 1.771 24h20.451C23.2 
                24 24 23.229 24 
                22.271V1.723C24 .771 23.2 
                0 22.225 0z"
              />
            </svg>
            Se connecter avec LinkedIn
          </button>
        </div>

        <div className="flex items-center mt-6 text-white text-center">
          <p>Pas encore de compte ?</p>
          <Link href="/signup" className="underline font-bold ml-2">
            S'inscrire
          </Link>
        </div>
      </div>
      )}
    </div>
  );
}
