import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-display", weight: ["700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Atacarejo · Preço baixo todo dia",
  description: "Mercearia, limpeza, bebidas, eletrônicos e muito mais, com entrega rápida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <CartProvider>
            <div className="pb-16 md:pb-0">
              {children}
              <footer
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: "#a3a3a3",
                  padding: "18px 16px 24px",
                }}
              >
                Desenvolvido por Fabrício da Silva França, para fins didáticos
              </footer>
            </div>
            <BottomNav />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
