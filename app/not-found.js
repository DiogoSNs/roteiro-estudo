import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <div className="py-16 sm:py-24 text-center flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
        Roteiro não encontrado
      </h1>
      <p className="text-zinc-600 text-sm sm:text-base mt-2 max-w-md">
        O endereço que você abriu não corresponde a nenhum roteiro.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block bg-zinc-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Ver todos os roteiros
        </Link>
      </div>
    </div>
  );
}
