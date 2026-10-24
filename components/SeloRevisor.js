export default function SeloRevisor({ professor }) {
  const nomeProfessor = professor?.nome || 'Professor Revisor';
  const disciplinaProfessor = professor?.disciplina || 'Disciplina';
  const escolaProfessor = professor?.escola || 'Escola Municipal da Rede';

  return (
    <div className="rounded-lg border border-zinc-300 bg-zinc-50/60 p-4 my-6">
      <h3 className="font-semibold text-zinc-900 text-sm">
        Conteúdo gerado por inteligência artificial
      </h3>
      <p className="text-zinc-700 text-sm mt-1">
        Revisado pelo professor {nomeProfessor}, de {disciplinaProfessor}, na {escolaProfessor}.
      </p>
    </div>
  );
}
