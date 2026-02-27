import { TransferForm } from "@/components/Transfer/TransferForm";
import { WelcomeCard } from "@/components/WelcomeCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 pt-12 pb-12 px-4">
      <TransferForm />
    </main>
  );
}
