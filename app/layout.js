import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Cabecalho from '@/components/Cabecalho';
import Rodape from '@/components/Rodape';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Roteiros de Estudo',
  description: 'Roteiros de estudo para alunos do 6º ao 9º ano.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="bg-zinc-100 text-zinc-900 min-h-screen p-4 sm:p-8 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white border border-zinc-200 rounded-lg shadow-sm flex flex-col min-h-[600px] overflow-hidden">
          <Cabecalho />
          <main className="p-6 sm:p-8 flex-1">
            {children}
          </main>
          <Rodape />
        </div>
      </body>
    </html>
  );
}
