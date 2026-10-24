export default function QuestaoItem({ pergunta, resposta }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="font-medium text-zinc-900 text-sm leading-relaxed">
        {pergunta}
      </p>
      <p className="text-zinc-600 text-sm mt-2 font-normal">
        Resposta: <span className="text-zinc-800">{resposta}</span>
      </p>
    </div>
  );
}
