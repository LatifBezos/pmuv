import { BeerIcon } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="my-2 flex flex-col items-center justify-center">
        <BeerIcon className="size-20 rotate-12 transition-all duration-200" />
        <p className="text-lg font-bold">Payemoiunverre</p>
      </div>

      <h1 className="text-4xl font-bold">404 - Page non trouvée</h1>
      <p className="text-2xl">La page que vous cherchez n'existe pas.</p>
    </main>
  );
}
