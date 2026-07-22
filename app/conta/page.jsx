"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { LogOut, Package, Phone } from "lucide-react";

function fmtMoney(v) {
  return `R$ ${Number(v || 0).toFixed(2).replace(".", ",")}`;
}
function fmtDate(d) {
  return new Date(d).toLocaleDateString("pt-BR");
}

const STATUS_LABELS = {
  pendente: "Pendente",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export default function ContaPage() {
  const { customer, loading, loginWithPhone, logout } = useAuth();
  const [phone, setPhone] = useState("");
  const [entering, setEntering] = useState(false);
  const [error, setError] = useState("");

  const [atacarejo_orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      if (!customer?.id) return;
      setLoadingOrders(true);
      const { data } = await supabase
        .from("atacarejo_orders")
        .select("*, atacarejo_order_items(product_name, quantity, unit_price)")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setLoadingOrders(false);
    }
    loadOrders();
  }, [customer]);

  async function handleLogin(e) {
    e.preventDefault();
    if (!phone.trim()) return;
    setError("");
    setEntering(true);
    try {
      await loginWithPhone(phone.trim());
    } catch (err) {
      setError(err.message || "Não foi possível entrar. Tente novamente.");
    } finally {
      setEntering(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <p className="p-8 text-center text-ink-soft">Carregando…</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="mx-auto max-w-sm px-4 py-16">
          <h1 className="font-display text-2xl font-extrabold text-ink">Minha Conta</h1>
          <p className="mt-1.5 text-sm text-ink-soft">Entre com seu telefone para ver seus pedidos.</p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl2 border border-ink/10 bg-white px-4 py-3">
              <Phone size={17} className="text-ink-soft" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Seu telefone / WhatsApp"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={entering}
              className="rounded-2xl bg-brand py-3.5 font-display text-base font-bold text-white disabled:opacity-60"
            >
              {entering ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-10">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-ink">
              Olá, {customer.name || "cliente"}!
            </h1>
            <p className="mt-1 text-sm text-ink-soft">{customer.phone}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink-soft"
          >
            <LogOut size={15} /> Sair
          </button>
        </div>

        <h2 className="mt-8 font-display text-lg font-bold text-ink">Meus pedidos</h2>

        {loadingOrders ? (
          <p className="mt-3 text-sm text-ink-soft">Carregando…</p>
        ) : atacarejo_orders.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {atacarejo_orders.map((o) => (
              <div key={o.id} className="rounded-xl2 border border-ink/8 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display text-sm font-bold text-ink">
                    <Package size={15} /> Pedido #{o.order_number}
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">{fmtDate(o.created_at)}</span>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  {(o.atacarejo_order_items || []).map((item, i) => (
                    <span key={i} className="text-xs text-ink-soft">{item.quantity}x {item.product_name}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/8 pt-2">
                  <span className="text-xs font-semibold text-ink-soft">{STATUS_LABELS[o.status] || o.status}</span>
                  <span className="font-display font-bold text-ink">{fmtMoney(o.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
