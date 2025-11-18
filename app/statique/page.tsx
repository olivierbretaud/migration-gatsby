import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma page statique",
  description: "Ma page statique",
};

export default async function StatiquePage() {

  return (
    <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 sm:items-start">
      <h1>Page statique</h1>
    </main>
  );
}