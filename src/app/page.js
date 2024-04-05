import ConnexionForm from "@/components/forms/ConnexionForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
      <h1 className="text-6xl mb-4">LA POSTE</h1>
      <ConnexionForm />

      <Link className="absolute top-2 right-2">Go to </Link>
    </main>
  );
}
