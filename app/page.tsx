import { CardForm } from "@/components/CardForm/CardForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-80 h-fit p-4 flex flex-col  items-center justify-between  ">
        <CardForm />
      </div>
    </main>
  );
}
