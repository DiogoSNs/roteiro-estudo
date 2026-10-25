import Link from 'next/link';
import { notFound } from 'next/navigation';
import roteiros from '@/data/roteiros.json';
import professores from '@/data/professores.json';
import SeloRevisor from '@/components/SeloRevisor';
import QuestaoItem from '@/components/QuestaoItem';
import TextoApoio from '@/components/TextoApoio';

// Geração estática das páginas dos roteiros no build 
export async function generateStaticParams() {
  return roteiros.map((roteiro) => ({
    id: String(roteiro.id),
  }));
}

export const dynamicParams = false;

export default async function PaginaDetalhesRoteiro({ params }) {
  const { id } = await params;

  // Busca pelo id
  const roteiro = roteiros.find((r) => String(r.id) === String(id));

  // Se o id não existir sagrado   404
  if (!roteiro) {
    notFound();
  }

  // Cruza os dados 
  const professor = professores.find((p) => p.id === roteiro.professorId);

  return (
    <article className="space-y-6">
      {/* retorno para a listagem */}
      <div>
        <Link
          href="/"
          className="text-xs sm:text-sm text-zinc-600 hover:text-zinc-900 underline inline-flex items-center gap-1.5 transition-colors"
        >
          Voltar para a lista
        </Link>
      </div>

      {/* disciplina, ano e tempo de estudo */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-zinc-100 text-zinc-800 text-xs font-medium px-3 py-1 rounded-full">
          {roteiro.disciplina}
        </span>
        <span className="bg-zinc-100 text-zinc-800 text-xs font-medium px-3 py-1 rounded-full">
          {roteiro.ano}
        </span>
        <span className="bg-zinc-100 text-zinc-800 text-xs font-medium px-3 py-1 rounded-full">
          Tempo de estudo: {roteiro.tempoEstudo}
        </span>
      </div>

      {/* Titulo e Tema */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          {roteiro.titulo}
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Tema: <span className="text-zinc-800 font-medium">{roteiro.tema}</span>
        </p>
      </div>

      {/* Selo do Prof Revisor e aviso de IA */}
      <SeloRevisor professor={professor} />

      {/* Explicação */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-zinc-900">Explicação</h2>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          {roteiro.explicacao}
        </p>
      </section>

      {/* Questao de Fixação */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-zinc-900">Questões de fixação</h2>
        <div className="space-y-3">
          {roteiro.questoes && roteiro.questoes.map((questao) => (
            <QuestaoItem
              key={questao.id}
              pergunta={questao.pergunta}
              resposta={questao.resposta}
            />
          ))}
        </div>
      </section>

      {/* Texto de Apoio */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-zinc-900">Texto de apoio</h2>
        <TextoApoio tema={roteiro.tema} termoWiki={roteiro.termoWiki} />
      </section>
    </article>
  );
}
