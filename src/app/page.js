import ConnexionForm from "@/components/forms/ConnexionForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl mb-4">LA POSTE</h1>
      <ConnexionForm />
    </main>
  );
}
