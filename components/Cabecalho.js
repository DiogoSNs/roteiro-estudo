'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Cabecalho() {
  const pathname = usePathname();
  const isPedido = pathname === '/pedido';
  const isRoteiros = !isPedido;

  return (
    <header className="border-b border-zinc-200 px-6 sm:px-8 py-5 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-zinc-900 tracking-tight hover:opacity-90">
        Roteiros de Estudo
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={`pb-1 transition-colors ${
            isRoteiros
              ? 'font-medium text-zinc-900 border-b-2 border-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Roteiros
        </Link>
        <Link
          href="/pedido"
          className={`pb-1 transition-colors ${
            isPedido
              ? 'font-medium text-zinc-900 border-b-2 border-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Pedir roteiro
        </Link>
      </nav>
    </header>
  );
}
