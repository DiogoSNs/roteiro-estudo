import Link from 'next/link';

export default function CardRoteiro({ roteiro }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-xs">
      <div>
        {/* Badges de Disciplina e Ano */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className="bg-zinc-100 text-zinc-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {roteiro.disciplina}
          </span>
          <span className="bg-zinc-100 text-zinc-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {roteiro.ano}
          </span>
        </div>

        {/* Título do Roteiro */}
        <h3 className="font-bold text-zinc-900 text-base leading-snug">
          {roteiro.titulo}
        </h3>

        {/* Informações complementares */}
        <div className="mt-2 space-y-0.5 text-xs text-zinc-600">
          <p>Tema: {roteiro.tema}</p>
          <p>Tempo de estudo: {roteiro.tempoEstudo}</p>
        </div>
      </div>

      {/* Botão para abrir os detalhes */}
      <div className="mt-4 pt-2">
        <Link
          href={`/roteiros/${roteiro.id}`}
          className="inline-block bg-zinc-900 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-md transition-colors"
        >
          Abrir roteiro
        </Link>
      </div>
    </div>
  );
}
