'use client';

export default function Filtros({
  disciplina,
  ano,
  aoMudarDisciplina,
  aoMudarAno,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 my-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-zinc-700">Disciplina</label>
        <select
          value={disciplina}
          onChange={(e) => aoMudarDisciplina(e.target.value)}
          className="border border-zinc-300 rounded px-2.5 py-1.5 text-sm bg-white"
        >
          <option value="">Todas</option>
          <option value="Matemática">Matemática</option>
          <option value="Ciências">Ciências</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Português">Português</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-zinc-700">Ano</label>
        <select
          value={ano}
          onChange={(e) => aoMudarAno(e.target.value)}
          className="border border-zinc-300 rounded px-2.5 py-1.5 text-sm bg-white"
        >
          <option value="">Todos</option>
          <option value="6º ano">6º ano</option>
          <option value="7º ano">7º ano</option>
          <option value="8º ano">8º ano</option>
          <option value="9º ano">9º ano</option>
        </select>
      </div>
    </div>
  );
}
