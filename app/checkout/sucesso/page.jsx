"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "../../../components/Header";

export default function CheckoutSucessoPage() {
  const searchParams = useSearchParams();
  const numero = searchParams.get("numero");

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
        <CheckCircle2 size={56} className="text-success" />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">Pedido confirmado!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {numero ? `Seu pedido nº ${numero} foi recebido com sucesso.` : "Seu pedido foi recebido com sucesso."}
          {" "}Você vai receber as atualizações por WhatsApp ou e-mail.
        </p>
        <Link href="/" className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
